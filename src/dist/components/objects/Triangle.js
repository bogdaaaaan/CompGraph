"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* triangle can be defined as 3 points written counterclockwise so that point inside triangle is left to its edges*/
var Triangle = /** @class */ (function () {
    function Triangle(a, b, c, n1, n2, n3) {
        var _this = this;
        this.transform = function (matrix) {
            _this._v1 = matrix.multiplyPoint(_this._v1);
            _this._v2 = matrix.multiplyPoint(_this._v2);
            _this._v3 = matrix.multiplyPoint(_this._v3);
            _this._n1 = matrix.multiplyVector(_this._n1);
            _this._n2 = matrix.multiplyVector(_this._n2);
            _this._n3 = matrix.multiplyVector(_this._n3);
        };
        this.intersectionWith = function (ray) {
            var orig = ray.origin;
            var dir = ray.direction;
            var edge1 = _this._v2.sub(_this._v1);
            var edge2 = _this._v3.sub(_this._v1);
            var pvec = dir.cross(edge2);
            var det = edge1.dot(pvec);
            if (det < _this._eps) {
                return null;
            }
            var tvec = orig.sub(_this._v1);
            var u = tvec.dot(pvec);
            if (u < 0 || u > det) {
                return null;
            }
            var qvec = tvec.cross(edge1);
            var v = dir.dot(qvec);
            if (v < 0 || u + v > det) {
                return null;
            }
            var t = edge2.dot(qvec);
            var inv_det = 1 / det;
            t *= inv_det;
            u *= inv_det;
            v *= inv_det;
            _this._u = u;
            _this._v = v;
            if (t >= 0) {
                return t;
            }
            else {
                return null;
            }
        };
        this.getNormalAtPoint = function (p) {
            // return res;
            var edge1 = _this._v2.sub(p);
            var edge2 = _this._v3.sub(p);
            return edge1.cross(edge2).toNormal();
        };
        this._v1 = a;
        this._v2 = b;
        this._v3 = c;
        this._n1 = n1;
        this._n2 = n2;
        this._n3 = n3;
        this._eps = 0.000001;
    }
    return Triangle;
}());
exports.default = Triangle;
