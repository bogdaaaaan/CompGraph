"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* triangle can be defined as 3 points written counterclockwise so that pint inside triangle is left to its edges*/
var Triangle = /** @class */ (function () {
    function Triangle(a, b, c) {
        this._v1 = a;
        this._v2 = b;
        this._v3 = c;
        this._eps = 0.000001;
    }
    Triangle.prototype.intersectionWith = function (ray) {
        var orig = ray.origin;
        var dir = ray.direction;
        var edge1 = this._v2.sub(this._v1);
        var edge2 = this._v3.sub(this._v1);
        var pvec = dir.cross(edge2);
        var det = edge1.dot(pvec);
        if (det < this._eps) {
            return null;
        }
        var tvec = orig.sub(this._v1);
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
        if (t >= 0) {
            return t;
        }
        else {
            return null;
        }
    };
    Triangle.prototype.getNormalAtPoint = function (p) {
        var edge1 = this._v2.sub(p);
        var edge2 = this._v3.sub(p);
        return edge1.cross(edge2).toNormal();
    };
    return Triangle;
}());
exports.default = Triangle;
