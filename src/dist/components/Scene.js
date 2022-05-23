"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ray_1 = require("./Ray");
var Scene = /** @class */ (function () {
    function Scene(camera, screen, light) {
        var _this = this;
        this._objects = [];
        this.addObject = function (obj) {
            _this._objects.push(obj);
        };
        this.calcLighting = function (normalAtPoint, t_val) {
            var dotProduct = t_val ? _this._light.direction.dot(normalAtPoint) / (t_val / 10) : _this._light.direction.dot(normalAtPoint);
            if (dotProduct < 0) {
                return ' ';
            }
            else if (dotProduct < 0.2) {
                return '.';
            }
            else if (dotProduct < 0.5) {
                return '*';
            }
            else if (dotProduct < 0.8) {
                return '0';
            }
            else {
                return '#';
            }
        };
        this.render = function () {
            _this._result = "";
            var origin = _this._camera.location;
            var result = '';
            /* for each row */
            for (var y = 0; y < _this._screen.height; y++) {
                var row = '';
                /* for each element in row */
                for (var x = 0; x < _this._screen.width; x++) {
                    /* create ray for each pixel of screen */
                    var dest = _this._screen.getPoint(x, y);
                    var direction = dest.sub(origin);
                    var ray = new Ray_1.default(direction, origin);
                    var object = null;
                    var t_value = Infinity;
                    for (var i = 0; i < _this._objects.length; i++) {
                        var _object = _this._objects[i];
                        var _t_value = _object.intersectionWith(ray);
                        if (_t_value != null && _t_value < t_value) {
                            t_value = _t_value;
                            object = _object;
                        }
                    }
                    /* if closest objects exists at given position, draw it's part */
                    if (object != null) {
                        var intersectionPoint = ray.getPointAt(t_value);
                        var normalAtPoint = object.getNormalAtPoint(intersectionPoint);
                        row += _this.calcLighting(normalAtPoint, t_value);
                        //row += this.calcLighting(normalAtPoint);
                    }
                    else {
                        row += ("-");
                    }
                    row += (" ");
                }
                result += row + ("\n");
            }
            _this._result = result;
            console.log(result);
        };
        this._camera = camera;
        this._screen = screen;
        this._light = light;
    }
    Object.defineProperty(Scene.prototype, "result", {
        get: function () { return this._result; },
        enumerable: false,
        configurable: true
    });
    ;
    return Scene;
}());
exports.default = Scene;
