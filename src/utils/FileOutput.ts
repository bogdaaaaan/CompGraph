import * as fs from 'fs';
import IOutput from './IOutput';

const DEFAULT_BG_COLOR: number[] = [128,0,255];

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
        for (let i = 0; i < width; i++) {
            this._matrix.push([]);
        }
    }

    public addElement = (x: number, elem: number): void => {
        if (x < this._width) {
            if (elem < 0) {
                this._matrix[x].push(DEFAULT_BG_COLOR);
            } else {
                this._matrix[x].push([Math.round(255 * elem), Math.round(255 * elem), Math.round(255 * elem)]);
            }
        }
    }

    public displayRenderResult = (): void => {
        let result_string: string = "";
        result_string += `P3\n${this._width}-${this._height}\n255\n`;

        for (let x = 0; x < this._width; x++) {
            for (let y = 0; y < this._height; y++) {
                result_string += `${this._matrix[x][y][0]} ${this._matrix[x][y][1]} ${this._matrix[x][y][2]}\n`;
            }
        }
        
        try {
            fs.writeFileSync(this._filename, result_string);
        } catch (error) {
            console.log(error)
        }
    }
}