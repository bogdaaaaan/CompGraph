"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Normal_1 = require("./Normal");
var Vector = /** @class */ (function () {
    function Vector(x, y, z) {
        var _this = this;
        /* addition of two vectors results in adding their corresponding coordinates */
        this.add = function (v) { return new Vector(_this.x + v.x, _this.y + v.y, _this.z + v.z); };
        /* subtraction of two vectors results in subtracting their corresponding coordinates */
        this.sub = function (v) { return new Vector(_this.x - v.x, _this.y - v.y, _this.z - v.z); };
        /* multiplication of vector to a number results in multiplication of number to vectors corresponding coordinates */
        this.mul = function (k) { return new Vector(_this.x * k, _this.y * k, _this.z * k); };
        /* scalar multiplication of two vectors results in multiplication of their corresponding coordinates */
        this.dot = function (v) { return _this.x * v.x + _this.y * v.y + _this.z * v.z; };
        /* get new vector that is perpendicular to this and given */
        this.cross = function (v) {
            var cx = _this.y * v.z - _this.z * v.y;
            var cy = _this.z * v.x - _this.x * v.z;
            var cz = _this.x * v.y - _this.y * v.x;
            return new Vector(cx, cy, cz);
        };
        /* changing lengths of vector to 1 */
        this.normalize = function () {
            var len = Math.sqrt(Math.pow(_this.x, 2) + Math.pow(_this.y, 2) + Math.pow(_this.z, 2));
            return new Vector(_this.x / len, _this.y / len, _this.z / len);
        };
        /* Transform vector into normal */
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
