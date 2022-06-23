"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* plane can be defined as a point representing how far the plane is from the world origin and a normal */
var Plane = /** @class */ (function () {
    function Plane(center, normal) {
        var _this = this;
        this.intersectionWith = function (ray) {
            /* scalar product of normal and beam direction */
            var denom = _this._normal.dot(ray.direction);
            /* if scalar product == 0, it means vectors are perpendicular */
            if (Math.abs(denom) > _this._eps) {
                /* we can find a vector from any point on plane by subtracting center point from this point */
                var center_origin = _this._center.sub(ray.origin);
                /* computing a position of intersection point with ray */
                var t = center_origin.dot(_this._normal) / denom;
                return t >= 0 ? t : null;
            }
            return null;
        };
        /* at any point plane returns it's normal */
        this.getNormalAtPoint = function (p) { return _this._normal; };
        this._center = center;
        this._normal = normal;
        this._eps = 0.000001;
    }
    return Plane;
}());
exports.default = Plane;
