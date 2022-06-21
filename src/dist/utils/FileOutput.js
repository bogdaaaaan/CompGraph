"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var DEFAULT_BG_COLOR = [128, 0, 255];
/* output in file can be written using info about output file path, height and width of scene and matrix with pixels */
var FileOutput = /** @class */ (function () {
    function FileOutput(width, height, filename) {
        var _this = this;
        /* fill in matrix with given coords and pixel data */
        this.addElement = function (x, elem) {
            if (x < _this._width) {
                if (elem < 0) {
                    _this._matrix[x].push(DEFAULT_BG_COLOR);
                }
                else {
                    _this._matrix[x].push([Math.round(255 * elem), Math.round(255 * elem), Math.round(255 * elem)]);
                }
            }
        };
        this.getOutput = function () {
            var result_string = "P3\n".concat(_this._width, " ").concat(_this._height, "\n255\n");
            for (var x = 0; x < _this._width; x++) {
                for (var y = 0; y < _this._height; y++) {
                    result_string += "".concat(_this._matrix[x][y][0], " ").concat(_this._matrix[x][y][1], " ").concat(_this._matrix[x][y][2], "\n");
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
        this._matrix = [];
        for (var i = 0; i < width; i++) {
            this._matrix.push([]);
        }
    }
    return FileOutput;
}());
exports.default = FileOutput;
