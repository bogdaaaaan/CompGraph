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

    /* in case same object used multiple times */
    public get poligons(): Triangle[]  { return this._poligons; };

    public readObject = (): Triangle[] => {
        /* using n-readlines module to read file line by line */
        const liner = new LineByLine(this._filepath);

        let line: any;

        /* create lists to which data will be pushed from file */
        const vertex_list: number[][] = [];
        const normal_list: number[][] = [];
        const index_list: number[][][] = [];

        /* read lines untill end of file */
        while (line = liner.next()) {
            /* if line is empty or comment - skip it */
            const words_in_line: string[] = line.toString().split(' ').filter((word: string) => word !== '')
            if (words_in_line.length === 0 || words_in_line[0] === '#') continue;

            /* get first word from line that corresponds to list of vertices, list of vertex normals or vertex indices */
            const parameter: string | undefined = words_in_line.shift();

            /* push data from line in corresponding list */
            switch (parameter) {
                case 'v':
                    const vertecies: number[] = [];
                    words_in_line.map(_ => vertecies.push(Number(_)));
                    vertex_list.push(vertecies);
                    break;
                case 'vn':
                    const normals: number[] = [];
                    words_in_line.map(_ => normals.push(Number(_)))
                    normal_list.push(normals);
                    break;
                case 'f':
                    const indexes_wrapper: number[][] = [];
                    words_in_line.map(word => {
                        const indexes: number[] = [];
                        word.split('/').filter((indx: string) => indx !== '').map(_ => indexes.push(Number(_)));
                        indexes_wrapper.push(indexes)
                    });
                    index_list.push(indexes_wrapper);
                    break;
                default:
                    break;
            }
        }

        /* read indexes and create triangles with data from lists */
        index_list.map((wrapper: number[][]) => {
            const points: Point[] = [];
            const normals: Vector[] = [];
            wrapper.map((indexes: number[]) => {
                const vertex: number[] = vertex_list[indexes[0] - 1]
                const normal: number[] = normal_list[indexes[1] - 1]
                
                points.push(new Point(vertex[0], vertex[1], vertex[2]))
                normals.push(new Vector(normal[0], normal[1], normal[2]));
            })
            this._poligons.push(new Triangle(points[0], points[1], points[2], normals[0], normals[1], normals[2]));
        })
        return this._poligons;
    }
}