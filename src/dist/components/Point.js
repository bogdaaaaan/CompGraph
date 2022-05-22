"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = require("./Vector");
var Point = /** @class */ (function () {
    function Point(x, y, z) {
        var _this = this;
        /* By adding vector to a point we get new point */
        this.add = function (v) { return new Point(_this.x + v.x, _this.y + v.y, _this.z + v.z); };
        /* By subtracting point from point we get new vector */
        this.sub = function (p) { return new Vector_1.default(_this.x - p.x, _this.y - p.y, _this.z - p.z); };
        this._x = x;
        this._y = y;
        this._z = z;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () { return this._x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () { return this._y; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "z", {
        get: function () { return this._z; },
        enumerable: false,
        configurable: true
    });
    return Point;
}());
exports.default = Point;
