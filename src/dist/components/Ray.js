"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ray = /** @class */ (function () {
    function Ray(direction, origin) {
        var _this = this;
        /* vec(o) + vec(d) * t, t - number of units from o */
        this.getPointAt = function (t) {
            return _this._origin.add(_this._direction.mul(t));
        };
        this._direction = direction;
        this._origin = origin;
    }
    Object.defineProperty(Ray.prototype, "origin", {
        get: function () { return this._origin; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Ray.prototype, "direction", {
        get: function () { return this._direction; },
        enumerable: false,
        configurable: true
    });
    ;
    return Ray;
}());
exports.default = Ray;
