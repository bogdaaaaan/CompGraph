"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Plane = /** @class */ (function () {
    function Plane(center, normal) {
        var _this = this;
        this.intersectionWith = function (ray) {
            var denom = _this._normal.dot(ray.direction);
            if (Math.abs(denom) > 1e-6) {
                var p0l0 = _this._center.sub(ray.origin);
                var t = p0l0.dot(_this._normal) / denom;
                if (t >= 0) {
                    return t;
                }
                else {
                    return null;
                }
            }
            return null;
        };
        this.getNormalAtPoint = function (p) { return _this._normal; };
        this._center = center;
        this._normal = normal;
    }
    return Plane;
}());
exports.default = Plane;
