"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sphere = /** @class */ (function () {
    function Sphere(center, radius) {
        var _this = this;
        this.intersectionWith = function (ray) {
            var o = ray.origin;
            var k = o.sub(_this._center);
            var d = ray.direction;
            /* t^2 * d^2 + 2tdk + k^2 - r^2 = 0 */
            /* t^2 * a + b * t + c = 0 */
            var d2 = d.dot(d);
            var r2 = Math.pow(_this._radius, 2);
            var k2 = k.dot(k);
            var a = d2;
            var b = 2 * d.dot(k);
            var c = k2 - r2;
            /* discriminant */
            var D = b * b - 4 * a * c;
            if (D >= 0) {
                /* if there is an intersection point, get distance between it and ray origin */
                return (-b - Math.sqrt(D)) / 2 * a;
            }
            else {
                return null;
            }
        };
        this.getNormalAtPoint = function (p) {
            return p.sub(_this._center).toNormal();
        };
        this._center = center;
        this._radius = radius;
    }
    return Sphere;
}());
exports.default = Sphere;
