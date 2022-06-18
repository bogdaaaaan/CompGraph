"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Plane = /** @class */ (function () {
    function Plane(center, normal) {
        var _this = this;
        this.intersectionWith = function (ray) {
            var d = ray.direction;
            var k = _this._center.sub(ray.origin);
            if (d.dot(_this._normal) !== 0) {
                var t = (k.dot(_this._normal)) / d.dot(_this._normal);
                if (t > 0) {
                    return t;
                }
                else {
                    return null;
                }
            }
            // let denom: number = this._normal.dot(ray.direction);
            // if (denom > this._eps) {
            // 	let p0l0: Vector = this._center.sub(ray.origin);
            // 	let t = p0l0.dot(this._normal) / denom;
            // 	if (t >= 0) {
            // 		return t;
            // 	} else {
            // 		return null;
            // 	}
            // }
            // return null;
        };
        this.getNormalAtPoint = function (p) { return _this._normal; };
        this._center = center;
        this._normal = normal;
        this._eps = 0.000001;
    }
    return Plane;
}());
exports.default = Plane;
