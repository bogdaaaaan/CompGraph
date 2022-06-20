"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = /** @class */ (function () {
    function Scene(camera, light, output) {
        var _this = this;
        this._objects = [];
        this.addObject = function (obj) {
            _this._objects.push(obj);
        };
        this.calcLighting = function (normalAtPoint) {
            var dotProduct = _this._light.direction.dot(normalAtPoint);
            if (dotProduct < 0) {
                return 0;
            }
            else {
                return dotProduct;
            }
        };
        this.render = function () {
            var rays = _this._screen.getRays();
            /* for each ray thrown at specific screen coordinates */
            rays.map(function (element) {
                var object = null;
                var t_value = Infinity;
                for (var i = 0; i < _this._objects.length; i++) {
                    var _object = _this._objects[i];
                    var _t_value = _object.intersectionWith(element.ray);
                    if (_t_value != null && _t_value < t_value) {
                        t_value = _t_value;
                        object = _object;
                    }
                }
                /* if closest objects exists at given position, draw it's part */
                if (object != null) {
                    var intersectionPoint = element.ray.getPointAt(t_value);
                    var normalAtPoint = object.getNormalAtPoint(intersectionPoint);
                    var light = _this.calcLighting(normalAtPoint);
                    _this._output.addElement(element.pos, light);
                }
                else {
                    _this._output.addElement(element.pos, -1);
                }
            });
            _this._output.displayRenderResult();
        };
        this._screen = camera;
        this._light = light;
        this._output = output;
    }
    return Scene;
}());
exports.default = Scene;
