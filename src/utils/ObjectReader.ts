import LineByLine = require('n-readlines');
import Triangle from '../components/objects/Triangle';
import Point from '../components/Point';
import Vector from '../components/Vector';

export default class ObjectReader {
    private _filepath: string;
    private _poligons: Triangle[];

    constructor(filepath: string) {
        this._filepath = filepath;
        this._poligons = [];
    }

    public readFile = (): Triangle[] => {
        const liner = new LineByLine(this._filepath);

        let line: any;

        let vertex_list: number[][] = [];
        let normal_list: number[][] = [];
        let index_list: number[][][] = [];

        while (line = liner.next()) {
            const words_in_line: string[] = line.toString().split(' ');
            if (words_in_line.length === 0 || words_in_line[0] === '#') {
                continue;
            }

            const token: string | undefined = words_in_line.shift();

            if (token === 'v') {
                let temp: number[] = [];

                for (let i = 0; i < 3; i++) {
                    temp.push(Number(words_in_line[i]))
                }

                vertex_list.push(temp);
            } else if (token === 'vn') {
                let temp: number[] = [];
                
                for (let i = 0; i < 3; i++) {
                    temp.push(Number(words_in_line[i]))
                }
                normal_list.push(temp);
            } else if (token === 'f') {
                let temp: number[][] = [];
                for (let i = 0; i < 3; i++) {
                    let temp2: any[] = [];
                    let indexes: string[] = words_in_line[i].split('/');

                    for (let j = 0; j < indexes.length; j++) {
                        if (indexes[j] !== '') {
                            temp2.push(Number(indexes[j]));
                        } else {
                            temp2.push(null);
                        }
                    }
                    temp.push(temp2);
                }
                index_list.push(temp);
            }
        }

        for (let i = 0; i < index_list.length; i++) {
            const element: number[][] = index_list[i];
            const p: Point[] = [];
            const n: Vector[] = [];

            for (let j = 0; j < element.length; j++) {
                const vertex_p1: number[] = vertex_list[element[j][0] - 1]
                const normal_p2: number[] = normal_list[element[j][2] - 1]
                
                p.push(new Point(vertex_p1[0], vertex_p1[1], vertex_p1[2]))
                n.push(new Vector(normal_p2[0], normal_p2[1], normal_p2[2]));
            }

            this._poligons.push(new Triangle(p[0], p[1], p[2], n[0], n[1], n[2]));
        }
        return this._poligons;
    }
}