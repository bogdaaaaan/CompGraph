"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
/* output in file can be written using info about output file path, height and width of scene and matrix with pixels */
var FileOutput = /** @class */ (function () {
    function FileOutput(width, height, filename, color, bg_color) {
        var _this = this;
        /* fill in matrix with given coords and pixel data */
        this.addElement = function (y, x, elem) {
            if (elem < 0) {
                _this._matrix[y][x] = _this._bg_color;
            }
            else {
                _this._matrix[y][x] = [Math.round(_this._color[0] * elem), Math.round(_this._color[1] * elem), Math.round(_this._color[2] * elem)];
            }
        };
        this.getOutput = function () {
            var result_string = "P3\n".concat(_this._width, " ").concat(_this._height, "\n255\n");
            for (var y = 0; y < _this._height; y++) {
                for (var x = 0; x < _this._width; x++) {
                    result_string += "".concat(_this._matrix[y][x][0], " ").concat(_this._matrix[y][x][1], " ").concat(_this._matrix[y][x][2], "\n");
                }
            }
            /* write result string into file */
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
        this._color = color;
        this._bg_color = bg_color;
        this._matrix = [];
        for (var i = 0; i < height; i++) {
            this._matrix.push([]);
        }
    }
    return FileOutput;
}());
exports.default = FileOutput;
