"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Normal_1 = require("./Normal");
var Vector = /** @class */ (function () {
    function Vector(x, y, z) {
        var _this = this;
        this.add = function (v) { return new Vector(_this.x + v.x, _this.y + v.y, _this.z + v.z); };
        this.sub = function (v) { return new Vector(_this.x - v.x, _this.y - v.y, _this.z - v.z); };
        this.mul = function (k) { return new Vector(_this.x * k, _this.y * k, _this.z * k); };
        this.dot = function (v) { return _this.x * v.x + _this.y * v.y + _this.z * v.z; };
        this.cross = function (v) {
            var cx = _this.y * v.z - _this.z * v.y;
            var cy = _this.z * v.x - _this.x * v.z;
            var cz = _this.x * v.y - _this.y * v.x;
            return new Vector(cx, cy, cz);
        };
        this.normalize = function () {
            var len = Math.sqrt(Math.pow(_this.x, 2) + Math.pow(_this.y, 2) + Math.pow(_this.z, 2));
            return new Vector(_this.x / len, _this.y / len, _this.z / len);
        };
        this.toNormal = function () {
            return Normal_1.default.create(_this._x, _this._y, _this._z);
        };
        this._x = x;
        this._y = y;
        this._z = z;
    }
    Object.defineProperty(Vector.prototype, "x", {
        get: function () { return this._x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () { return this._y; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "z", {
        get: function () { return this._z; },
        enumerable: false,
        configurable: true
    });
    return Vector;
}());
exports.default = Vector;
