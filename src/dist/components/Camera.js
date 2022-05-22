"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Camera = /** @class */ (function () {
    function Camera(location) {
        this._location = location;
    }
    Object.defineProperty(Camera.prototype, "location", {
        /* Camera has location as a point */
        get: function () { return this._location; },
        enumerable: false,
        configurable: true
    });
    ;
    return Camera;
}());
exports.default = Camera;
