"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilesService = /** @class */ (function () {
    function FilesService(default_path) {
        var _this = this;
        /* returns path to input and output files */
        this.getFiles = function () {
            var input_file = "";
            var output_file = "";
            var args = require('minimist')(process.argv.slice(2));
            if ('source' in args)
                input_file = _this._default_path + args.source;
            if ('output' in args)
                output_file = _this._default_path + args.output;
            return [input_file, output_file];
        };
        this._default_path = default_path;
    }
    return FilesService;
}());
exports.default = FilesService;
