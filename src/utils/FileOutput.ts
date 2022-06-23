import * as fs from 'fs';
import IOutput from './IOutput';

const DEFAULT_BG_COLOR: number[] = [128,0,255];

/* output in file can be written using info about output file path, height and width of scene and matrix with pixels */
export default class FileOutput implements IOutput {
    private _matrix: number[][][];
    private _width: number;
    private _height: number;
    private _filename: string;

    constructor(width: number, height: number, filename: string) {
        this._height = height;
        this._width = width; 
        this._filename = filename;

        this._matrix = [];     
        for (let i = 0; i < height; i++) {
            this._matrix.push([]);
        }
    }

    /* fill in matrix with given coords and pixel data */
    public addElement = (y: number, x: number, elem: number): void => {
        if (elem < 0) {
            this._matrix[y][x] = DEFAULT_BG_COLOR;
        } else {
            this._matrix[y][x] = [Math.round(255 * elem), Math.round(255 * elem), Math.round(255 * elem)];
        }
    }

    public getOutput = (): void => {
        let result_string: string = `P3\n${this._width} ${this._height}\n255\n`;

        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                result_string += `${this._matrix[y][x][0]} ${this._matrix[y][x][1]} ${this._matrix[y][x][2]}\n`;
            }
        }
        
        /* write result string into file */
        try {
            fs.writeFileSync(this._filename, result_string);
        } catch (error) {
            console.log(error)
        }
    }
}