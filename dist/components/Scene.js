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
            /* for each row */
            for (var y = 0; y < _this._screen.height; y++) {
                var row = '';
                var _loop_1 = function (x) {
                    /* create ray for each pixel of screen */
                    var dest = _this._screen.getPoint(x, y);
                    var direction = dest.sub(origin);
                    var ray = new Ray_1.default(direction, origin);
                    /* find nearest object ray intersects with */
                    var distances = [];
                    for (var i = 0; i < _this._objects.length; i++) {
                        var object = _this._objects[i];
                        var t_value = object.intersectionWith(ray);
                        if (t_value != null)
                            distances.push({ obj: object, value: t_value });
                    }
                    /* if multiple objects on scene, draw only closest parts */
                    if (distances.length) {
                        var val_1 = Math.min.apply(Math, distances.map(function (x) { return x.value; }));
                        var obj = distances.filter(function (x) { return x.value === val_1; })[0].obj;
                        var intersectionPoint = ray.getPointAt(val_1);
                        var normalAtPoint = obj.getNormalAtPoint(intersectionPoint);
                        row += _this.calcLighting(normalAtPoint);
                    }
                    else {
                        row += ("-");
                    }
                    row += (" ");
                };
                /* for each element in row */
                for (var x = 0; x < _this._screen.width; x++) {
                    _loop_1(x);
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
