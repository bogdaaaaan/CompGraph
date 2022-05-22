"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirectedLight = /** @class */ (function () {
    function DirectedLight(direction) {
        this._direction = direction;
    }
    Object.defineProperty(DirectedLight.prototype, "direction", {
        /* light has a direction as a normal */
        get: function () { return this._direction; },
        enumerable: false,
        configurable: true
    });
    ;
    return DirectedLight;
}());
exports.default = DirectedLight;
