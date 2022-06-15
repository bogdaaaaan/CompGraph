"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleOutput = /** @class */ (function () {
    function ConsoleOutput(width, height) {
        var _this = this;
        this.addElement = function (x, elem) {
            if (x < _this._width) {
                _this._matrix[x].push(elem);
            }
            else {
                console.log("Row index out of the image size");
            }
        };
        this.displayRenderResult = function () {
            var result_string = '';
            for (var x = 0; x < _this._width; x++) {
                for (var y = 0; y < _this._height; y++) {
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
