"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleOutput = /** @class */ (function () {
    /* console output should have info about width and height of scene */
    function ConsoleOutput(width, height) {
        var _this = this;
        /* fill in matrix with given coords and pixel data */
        this.addElement = function (x, y, elem) {
            _this._matrix[y][x] = elem;
        };
        this.getOutput = function () {
            var result_string = '';
            for (var x = 0; x < _this._width; x++) {
                for (var y = 0; y < _this._height; y++) {
                    /* depending from light, pixels will have different corresponding symbols */
                    var dot = _this._matrix[x][y];
                    if (dot < 0) {
                        result_string += '-';
                    }
                    else if (dot == 0) {
                        result_string += ' ';
                    }
                    else if (dot < 0.2) {
                        result_string += '.';
                    }
                    else if (dot < 0.5) {
                        result_string += '*';
                    }
                    else if (dot < 0.8) {
                        result_string += '0';
                    }
                    else {
                        result_string += '#';
                    }
                    result_string += ' ';
                }
                result_string += '\n';
            }
            console.log(result_string);
        };
        this._height = height;
        this._width = width;
        this._matrix = [];
        for (var i = 0; i < width; i++) {
            this._matrix.push([]);
        }
    }
    return ConsoleOutput;
}());
exports.default = ConsoleOutput;
