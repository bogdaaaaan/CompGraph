"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LineByLine = require("n-readlines");
var ObjectReader = /** @class */ (function () {
    function ObjectReader(filepath) {
        var _this = this;
        this.readObject = function () {
            /* using n-readlines module to read file line by line */
            var liner = new LineByLine(_this._filepath);
            var line;
            /* create lists to which data will be pushed from file */
            var vertex_list = [];
            var normal_list = [];
            var index_list = [];
            var _loop_1 = function () {
                /* if line is empty or comment - skip it */
                var words_in_line = line.toString().split(' ').filter(function (word) { return word !== ''; });
                if (words_in_line.length === 0 || words_in_line[0] === '#')
                    return "continue";
                /* get first word from line that corresponds to list of vertices, list of vertex normals or vertex indices */
                var parameter = words_in_line.shift();
                /* push data from line in corresponding list */
                switch (parameter) {
                    case 'v':
                        var vertecies_1 = [];
                        words_in_line.map(function (_) { return vertecies_1.push(Number(_)); });
                        vertex_list.push(vertecies_1);
                        break;
                    case 'vn':
                        var normals_1 = [];
                        words_in_line.map(function (_) { return normals_1.push(Number(_)); });
                        normal_list.push(normals_1);
                        break;
                    case 'f':
                        var indexes_wrapper_1 = [];
                        words_in_line.map(function (word) {
                            var indexes = [];
                            word.split('/').filter(function (indx) { return indx !== ''; }).map(function (_) { return indexes.push(Number(_)); });
                            indexes_wrapper_1.push(indexes);
                        });
                        index_list.push(indexes_wrapper_1);
                        break;
                    default:
                        break;
                }
            };
            /* read lines untill end of file */
            while (line = liner.next()) {
                _loop_1();
            }
            console.log("Finished reading file ".concat(_this._filepath));
            return [vertex_list, normal_list, index_list];
        };
        this._filepath = filepath;
    }
    return ObjectReader;
}());
exports.default = ObjectReader;
