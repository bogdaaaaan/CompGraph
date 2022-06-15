"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
var Vector_1 = require("./Vector");
var Matrix4x4 = /** @class */ (function () {
    function Matrix4x4() {
        var _this = this;
        this.multiplyMatrices = function (other_matrix) {
            var result = [];
            for (var i = 0; i < _this._matrix.length; i++) {
                result.push([]);
            }
            for (var i = 0; i < _this._matrix.length; i++) {
                for (var j = 0; j < other_matrix[0].length; j++) {
                    var cell = 0;
                    for (var k = 0; k < other_matrix.length; k++) {
                        cell += _this._matrix[i][k] * other_matrix[i][j];
                    }
                    result[i][j] = cell;
                }
            }
            _this._matrix = result;
        };
        this.multiplyVector = function (v) {
            var result = [];
            var vector4 = [v.x, v.y, v.z, 1];
            for (var i = 0; i < _this._matrix.length; i++) {
                var cell = 0;
                for (var j = 0; j < 4; j++) {
                    cell += _this._matrix[i][j] * vector4[j];
                }
                result[i] = cell;
            }
            return new Vector_1.default(result[0], result[1], result[2]).normalize();
        };
        this.multiplyPoint = function (p) {
            var result = [];
            var vector4 = [p.x, p.y, p.z, 1];
            for (var i = 0; i < _this._matrix.length; i++) {
                var cell = 0;
                for (var j = 0; j < 4; j++) {
                    cell += _this._matrix[i][j] * vector4[j];
                }
                result[i] = cell;
            }
            return new Point_1.default(result[0], result[1], result[2]);
        };
        this.move = function (x, y, z) {
            var new_move = [
                [1, 0, 0, x],
                [0, 1, 0, y],
                [0, 0, 1, z],
                [0, 0, 0, 1]
            ];
            if (_this._matrix === null) {
                _this._matrix = new_move;
            }
            else {
                _this.multiplyMatrices(new_move);
            }
        };
        this.scale = function (x, y, z) {
            var new_move = [
                [x, 0, 0, 0],
                [0, y, 0, 0],
                [0, 0, z, 0],
                [0, 0, 0, 1]
            ];
            if (_this._matrix === null) {
                _this._matrix = new_move;
            }
            else {
                _this.multiplyMatrices(new_move);
            }
        };
        this.rotateX = function (x_angle) {
            var rad = (x_angle) * (Math.PI / 180);
            var new_move = [
                [Math.cos(rad), -Math.sin(rad), 0, 0],
                [Math.sin(rad), Math.cos(rad), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ];
            if (_this._matrix === null) {
                _this._matrix = new_move;
            }
            else {
                _this.multiplyMatrices(new_move);
            }
        };
        this.rotateY = function (y_angle) {
            var rad = (y_angle) * (Math.PI / 180);
            var new_move = [
                [Math.cos(rad), 0, Math.sin(rad), 0],
                [0, 1, 0, 0],
                [-Math.sin(rad), 0, Math.cos(rad), 0],
                [0, 0, 0, 1],
            ];
            if (_this._matrix === null) {
                _this._matrix = new_move;
            }
            else {
                _this.multiplyMatrices(new_move);
            }
        };
        this.rotateZ = function (z_angle) {
            var rad = (z_angle) * (Math.PI / 180);
            var new_move = [
                [1, 0, 0, 0],
                [0, Math.cos(rad), -Math.sin(rad), 0],
                [0, Math.sin(rad), Math.cos(rad), 0],
                [0, 0, 0, 1]
            ];
            if (_this._matrix === null) {
                _this._matrix = new_move;
            }
            else {
                _this.multiplyMatrices(new_move);
            }
        };
        this._matrix = null;
    }
    return Matrix4x4;
}());
exports.default = Matrix4x4;
