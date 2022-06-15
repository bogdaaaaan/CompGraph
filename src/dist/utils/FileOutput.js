"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FileOutput = /** @class */ (function () {
    function FileOutput(width, height, filename) {
        var _this = this;
        this.addElement = function (x, elem) {
            if (x < _this._width) {
                if (elem < 0) {
                    _this._matrix[x].push([128, 0, 255]);
                }
                else {
                    _this._matrix[x].push([Math.round(255 * elem), Math.round(255 * elem), Math.round(255 * elem)]);
                }
            }
            else {
                console.log("Row index out of the image size");
            }
        };
        this.displayRenderResult = function () {
            var result_string = "";
            result_string += "P3\n".concat(_this._width, "-").concat(_this._height, "\n256\n");
            for (var x = 0; x < _this._width; x++) {
                for (var y = 0; y < _this._height; y++) {
                    result_string += "".concat(_this._matrix[x][y][0], " ").concat(_this._matrix[x][y][1], " ").concat(_this._matrix[x][y][2], "\n");
                }
                result_string += '\n';
            }
            try {
                fs.writeFileSync(_this._filename, result_string);
            }
            catch (error) {
                console.log(error);
            }
        };
        this._height = height;
        this._width = width;
        this._filename = filename;
        this._matrix = [];
        for (var i = 0; i < width; i++) {
            this._matrix.push([]);
        }
    }
    return FileOutput;
}());
exports.default = FileOutput;
