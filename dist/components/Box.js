"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Box = /** @class */ (function () {
    function Box(center, width, height) {
        var _this = this;
        this.intersectionWith = function (ray) {
            var o = ray.origin;
            var k = o.sub(_this._center);
            var d = ray.direction;
            var d2 = d.dot(d);
            var r2 = Math.pow(_this._width, 2);
            var k2 = k.dot(k);
            var a = d2;
            var b = 2 * d.dot(k);
            var cc = k2 - r2;
            var D = b * b - 4 * a * cc;
            if (D >= 0) {
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
        this._height = height;
        this._width = width;
    }
    return Box;
}());
exports.default = Box;
