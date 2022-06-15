"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Triangle = /** @class */ (function () {
    function Triangle(p1, p2, p3, v1, v2, v3) {
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
            var o = ray.origin;
            var d = ray.direction;
            var edge1 = _this._v2.sub(_this._v1);
            var edge2 = _this._v3.sub(_this._v1);
            var pvec = d.cross(edge2);
            var det = edge1.dot(pvec);
            if (det < _this._eps) {
                return null;
            }
            var tvec = o.sub(_this._v1);
            var u = tvec.dot(pvec);
            if (u < 0 || u > det) {
                return null;
            }
            var qvec = tvec.cross(edge1);
            var v = d.dot(qvec);
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
            return _this._n2.mul(_this._u).add(_this._n3.mul(_this._v).add(_this._n1.mul(1 - _this._v - _this._u))).toNormal();
        };
        this._v1 = p1;
        this._v2 = p2;
        this._v3 = p3;
        this._n1 = v1;
        this._n2 = v2;
        this._n3 = v3;
        this._eps = 0.00001;
    }
    return Triangle;
}());
exports.default = Triangle;
