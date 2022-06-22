"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sphere_1 = require("./objects/Sphere");
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
        this.caclShading = function (ray, obj) {
            for (var i = 0; i < _this._objects.length; i++) {
                if (_this._objects[i] !== obj) {
                    var _t_value = _this._objects[i].intersectionWith(ray);
                    if (_this._objects[i] instanceof Sphere_1.default)
                        console.log(_t_value);
                    if (_t_value !== null)
                        return true;
                }
            }
            return false;
        };
        this.render = function () {
            var rays = _this._camera.getRays();
            /* for each ray thrown at specific screen coordinates */
            var counter = 0;
            rays.map(function (element, indx) {
                counter++;
                if (counter === Math.round(rays.length / 100)) {
                    //console.log(`Step ${indx+1}/${rays.length}`);
                    counter = 0;
                }
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
                    // if (this.caclShading(new Ray(this._light.direction, intersectionPoint), object)) {
                    //  	this._output.addElement(element.pos.x, element.pos.y, 0);
                    //  } else {
                    var light = _this.calcLighting(normalAtPoint);
                    _this._output.addElement(element.pos.x, element.pos.y, light);
                    //}
                }
                else {
                    _this._output.addElement(element.pos.x, element.pos.y, -1);
                }
            });
            _this._output.getOutput();
        };
        this._camera = camera;
        this._light = light;
        this._output = output;
    }
    return Scene;
}());
exports.default = Scene;
