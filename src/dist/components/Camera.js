"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
/* camera has posistion, size of visible space and field of view  */
var Camera = /** @class */ (function () {
    function Camera(location, width, height, POV_multiplier) {
        var _this = this;
        /* points selection goes from left top screen corner to right bottom */
        this.getPoint = function (x, y) {
            return new Point_1.default(-_this._width / 2 + x + 0.5, _this._height / 2 - y - 0.5, _this.location.z - _this._POV_multiplier);
        };
        this._location = location;
        this._width = width;
        this._height = height;
        this._POV_multiplier = POV_multiplier;
    }
    Object.defineProperty(Camera.prototype, "width", {
        get: function () { return this._width; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "height", {
        get: function () { return this._height; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "location", {
        get: function () { return this._location; },
        enumerable: false,
        configurable: true
    });
    ;
    return Camera;
}());
exports.default = Camera;
