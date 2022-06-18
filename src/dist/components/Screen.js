"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
var Screen = /** @class */ (function () {
    function Screen(width, height, center) {
        var _this = this;
        /* points selection goes from left top screen corner to right bottom */
        this.getPoint = function (x, y) {
            return new Point_1.default(-_this._width / 2 + x + 0.5, _this._height / 2 - y - 0.5, _this._center.z);
        };
        this._width = width;
        this._height = height;
        this._center = center;
    }
    Object.defineProperty(Screen.prototype, "width", {
        get: function () { return this._width; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Screen.prototype, "height", {
        get: function () { return this._height; },
        enumerable: false,
        configurable: true
    });
    return Screen;
}());
exports.default = Screen;
