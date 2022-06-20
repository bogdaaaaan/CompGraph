"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LineByLine = require("n-readlines");
var Triangle_1 = require("../components/objects/Triangle");
var Point_1 = require("../components/Point");
var Vector_1 = require("../components/Vector");
var ObjectReader = /** @class */ (function () {
    function ObjectReader(filepath) {
        var _this = this;
        this.readFile = function () {
            var liner = new LineByLine(_this._filepath);
            var line;
            var vertex_list = [];
            var normal_list = [];
            var index_list = [];
            while (line = liner.next()) {
                var words_in_line = line.toString().split(' ');
                if (words_in_line.length === 0 || words_in_line[0] === '#') {
                    continue;
                }
                var token = words_in_line.shift();
                if (token === 'v') {
                    var temp = [];
                    for (var i = 0; i < 3; i++) {
                        temp.push(Number(words_in_line[i]));
                    }
                    vertex_list.push(temp);
                }
                else if (token === 'vn') {
                    var temp = [];
                    for (var i = 0; i < 3; i++) {
                        temp.push(Number(words_in_line[i]));
                    }
                    normal_list.push(temp);
                }
                else if (token === 'f') {
                    var temp = [];
                    for (var i = 0; i < 3; i++) {
                        var temp2 = [];
                        var indexes = words_in_line[i].split('/');
                        for (var j = 0; j < indexes.length; j++) {
                            if (indexes[j] !== '') {
                                temp2.push(Number(indexes[j]));
                            }
                            else {
                                temp2.push(null);
                            }
                        }
                        temp.push(temp2);
                    }
                    index_list.push(temp);
                }
            }
            for (var i = 0; i < index_list.length; i++) {
                var element = index_list[i];
                var p = [];
                var n = [];
                for (var j = 0; j < element.length; j++) {
                    var vertex_p1 = vertex_list[element[j][0] - 1];
                    var normal_p2 = normal_list[element[j][2] - 1];
                    p.push(new Point_1.default(vertex_p1[0], vertex_p1[1], vertex_p1[2]));
                    n.push(new Vector_1.default(normal_p2[0], normal_p2[1], normal_p2[2]));
                }
                _this._poligons.push(new Triangle_1.default(p[0], p[1], p[2], n[0], n[1], n[2]));
            }
            return _this._poligons;
        };
        this._filepath = filepath;
        this._poligons = [];
    }
    return ObjectReader;
}());
exports.default = ObjectReader;
