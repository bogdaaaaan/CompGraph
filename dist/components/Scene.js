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
        this.calcLighting = function (normalAtPoint) {
            var dotProduct = _this._light.direction.dot(normalAtPoint);
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
            var origin = _this._camera.location;
            var result = '';
            for (var x = 0; x < _this._screen.height; x++) {
                var row = '';
                for (var y = 0; y < _this._screen.width; y++) {
                    var dest = _this._screen.getPoint(x, y);
                    var direction = dest.sub(origin);
                    var ray = new Ray_1.default(direction, origin);
                    for (var i = 0; i < _this._objects.length; i++) {
                        var object = _this._objects[i];
                        var tVal = object.intersectionWith(ray);
                        if (tVal != null) {
                            var intersectionPoint = ray.getPointAt(tVal);
                            var normalAtPoint = object.getNormalAtPoint(intersectionPoint);
                            row += _this.calcLighting(normalAtPoint);
                            break;
                        }
                        else {
                            row += ("-");
                        }
                    }
                    row += (" ");
                }
                result += row + ("\n");
            }
            console.log(result);
        };
        this._camera = camera;
        this._screen = screen;
        this._light = light;
    }
    return Scene;
}());
exports.default = Scene;
