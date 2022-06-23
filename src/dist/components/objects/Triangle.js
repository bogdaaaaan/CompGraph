"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* triangle can be defined as 3 points written counterclockwise so that point inside triangle is left to its edges*/
var Triangle = /** @class */ (function () {
    function Triangle(a, b, c, n1, n2, n3) {
        var _this = this;
        /* Möller–Trumbore algorithm */
        this.intersectionWith = function (ray) {
            var orig = ray.origin;
            var dir = ray.direction;
            /* find two vectors that share vertex #1 */
            var edge1 = _this._v2.sub(_this._v1);
            var edge2 = _this._v3.sub(_this._v1);
            var pvec = dir.cross(edge2);
            var det = edge1.dot(pvec);
            /* if determinant is zero, ray lies in plane of triangle */
            if (det === 0)
                return null;
            var inv_det = 1 / det;
            var tvec = orig.sub(_this._v1);
            var u = tvec.dot(pvec) * inv_det;
            if (u < 0 || u > 1)
                return null;
            var qvec = tvec.cross(edge1);
            var v = dir.dot(qvec) * inv_det;
            if (v < 0 || u + v > 1)
                return null;
            /* calculate t parameter */
            var t = edge2.dot(qvec) * inv_det;
            return t >= 0 ? t : null;
        };
        this.getNormalAtPoint = function (p) {
            /* if all normals are zero, return cross product of two verticies sharing p point */
            if (!_this._n1.length() && !_this._n2.length() && !_this._n3.length()) {
                var edge1 = _this._v2.sub(p);
                var edge2 = _this._v3.sub(p);
                return edge1.cross(edge2).toNormal();
            }
            /* create vectors from each vertex to point and get lengths */
            var l1 = _this._v1.sub(p).length();
            var l2 = _this._v2.sub(p).length();
            var l3 = _this._v3.sub(p).length();
            var l_sum = l1 + l2 + l3;
            l1 = l1 / l_sum;
            l2 = l2 / l_sum;
            l3 = l3 / l_sum;
            /* increase normals, add them and normalize the result */
            var a = _this._n1.mul(l1);
            var b = _this._n2.mul(l2);
            var c = _this._n3.mul(l3);
            var res = (a.add(b)).add(c);
            return res.toNormal();
        };
        /* transforms each point and normal depending from transform matrix */
        this.transform = function (matrix) {
            _this._v1 = matrix.multiplyPoint(_this._v1);
            _this._v2 = matrix.multiplyPoint(_this._v2);
            _this._v3 = matrix.multiplyPoint(_this._v3);
            _this._n1 = matrix.multiplyNormal(_this._n1);
            _this._n2 = matrix.multiplyNormal(_this._n2);
            _this._n3 = matrix.multiplyNormal(_this._n3);
        };
        this._v1 = a;
        this._v2 = b;
        this._v3 = c;
        this._n1 = n1;
        this._n2 = n2;
        this._n3 = n3;
    }
    return Triangle;
}());
exports.default = Triangle;
