"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Triangle_1 = require("./objects/Triangle");
var Point_1 = require("./Point");
var Vector_1 = require("./Vector");
var Normal_1 = require("./Normal");
var Matrix4x4 = /** @class */ (function () {
    function Matrix4x4() {
        var _this = this;
        /* two matrices multiplication */
        this.multiplyMatrix = function (other_matrix) {
            /* resulting matrix */
            var result = [];
            _this._matrix.map(function (_) { return result.push(new Array(_this._matrix.length).fill(0)); });
            /* multiply matrices */
            for (var i = 0; i < _this._matrix.length; i++) {
                for (var j = 0; j < other_matrix[0].length; j++) {
                    for (var k = 0; k < other_matrix.length; k++) {
                        result[i][j] += _this._matrix[i][k] * other_matrix[k][j];
                    }
                }
            }
            /* change matrix */
            _this._matrix = result;
        };
        /* matrix on vector multiplication */
        this.multiplyVector = function (v) {
            var res = new Array(_this._matrix.length).fill(0);
            var vector4 = [v.x, v.y, v.z, 1];
            /* multiply each value from each matrix row by each vector4 value */
            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < vector4.length; j++) {
                    res[i] += _this._matrix[i][j] * vector4[j];
                }
            }
            return new Vector_1.default(res[0], res[1], res[2]);
        };
        /* matrix on vector multiplication */
        this.multiplyNormal = function (v) {
            var res = new Array(_this._matrix.length).fill(0);
            var vector4 = [v.x, v.y, v.z, 1];
            /* multiply each value from each matrix row by each vector4 value */
            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < vector4.length; j++) {
                    res[i] += _this._matrix[i][j] * vector4[j];
                }
            }
            return Normal_1.default.create(res[0], res[1], res[2]);
        };
        this.multiplyPoint = function (p) {
            var res = new Array(_this._matrix.length).fill(0);
            var vector4 = [p.x, p.y, p.z, 1];
            for (var i = 0; i < _this._matrix.length; i++) {
                for (var j = 0; j < 4; j++) {
                    res[i] += _this._matrix[i][j] * vector4[j];
                }
            }
            return new Point_1.default(res[0], res[1], res[2]);
        };
        this.transformObject = function (vertex_list, normal_list, index_list) {
            var poligons = [];
            /* read indexes and create triangles with data from lists */
            index_list.map(function (wrapper) {
                var points = [];
                var normals = [];
                wrapper.map(function (indexes) {
                    var vertex = vertex_list[indexes[0] - 1];
                    var normal = normal_list[indexes[1] - 1];
                    /* create already transformed triangles */
                    points.push(_this.multiplyPoint(new Point_1.default(vertex[0], vertex[1], vertex[2])));
                    normals.push(_this.multiplyNormal(new Vector_1.default(normal[0], normal[1], normal[2])));
                });
                // const cntr_clockwise_p: Point[] = points.reverse();
                // const cntr_clockwise_n: Normal[] = normals.reverse();
                poligons.push(new Triangle_1.default(points[0], points[1], points[2], normals[0], normals[1], normals[2]));
            });
            return poligons;
        };
        this.scale = function (s) {
            var scaled_matrix = [
                [s, 0, 0, 0],
                [0, s, 0, 0],
                [0, 0, s, 0],
                [0, 0, 0, 1]
            ];
            _this.multiplyMatrix(scaled_matrix);
        };
        this.move = function (x, y, z) {
            var moved_matrix = [
                [1, 0, 0, x],
                [0, 1, 0, y],
                [0, 0, 1, z],
                [0, 0, 0, 1],
            ];
            _this.multiplyMatrix(moved_matrix);
        };
        this.rotate = function (x_angle, y_angle, z_angle) {
            if (x_angle)
                _this.rotateX(x_angle);
            if (y_angle)
                _this.rotateY(y_angle);
            if (z_angle)
                _this.rotateZ(z_angle);
        };
        this.rotateX = function (x_angle) {
            var rad = (x_angle) * (Math.PI / 180);
            var x_rotated_matrix = [
                [1, 0, 0, 0],
                [0, Math.cos(rad), -Math.sin(rad), 0],
                [0, Math.sin(rad), Math.cos(rad), 0],
                [0, 0, 0, 1]
            ];
            _this.multiplyMatrix(x_rotated_matrix);
        };
        this.rotateY = function (y_angle) {
            var rad = (y_angle) * (Math.PI / 180);
            var y_rotated_matrix = [
                [Math.cos(rad), 0, Math.sin(rad), 0],
                [0, 1, 0, 0],
                [-Math.sin(rad), 0, Math.cos(rad), 0],
                [0, 0, 0, 1],
            ];
            _this.multiplyMatrix(y_rotated_matrix);
        };
        this.rotateZ = function (z_angle) {
            var rad = (z_angle) * (Math.PI / 180);
            var z_rotated_matrix = [
                [Math.cos(rad), -Math.sin(rad), 0, 0],
                [Math.sin(rad), Math.cos(rad), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ];
            _this.multiplyMatrix(z_rotated_matrix);
        };
        this._matrix = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }
    return Matrix4x4;
}());
exports.default = Matrix4x4;
