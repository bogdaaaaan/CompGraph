"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
var Ray_1 = require("./Ray");
/* screen has posistion, size of visible space and field of view  */
var Screen = /** @class */ (function () {
    function Screen(location, width, height, FOV) {
        var _this = this;
        /* points selection goes from left top screen corner to right bottom */
        this.getPoint = function (x, y) {
            return new Point_1.default(-_this._width / 2 + x + 0.5, _this._height / 2 - y - 0.5, _this.location.z - _this._FOV);
        };
        /* create rays for specific screen coordinates */
        this.getRays = function () {
            var rays = [];
            for (var y = 0; y < _this._height; y++) {
                for (var x = 0; x < _this._width; x++) {
                    var _ray = new Ray_1.default(_this.getPoint(x, y).sub(_this._location), _this._location);
                    rays.push({ ray: _ray, pos: y });
                }
            }
            return rays;
        };
        this._location = location;
        this._width = width;
        this._height = height;
        this._FOV = FOV;
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
    Object.defineProperty(Screen.prototype, "location", {
        get: function () { return this._location; },
        enumerable: false,
        configurable: true
    });
    ;
    return Screen;
}());
exports.default = Screen;
