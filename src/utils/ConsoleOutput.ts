import IOutput from "./IOutput";

export default class ConsoleOutput implements IOutput {
    private _matrix: number[][];
    private _width: number;
    private _height: number;

    /* console output should have info about width and height of scene */
    constructor(width: number, height: number) {
        this._height = height;
        this._width = width;

        this._matrix = [];     
        for (let i = 0; i < width; i++) {
            this._matrix.push([]);
        }
    }

    /* fill in matrix with given coords and pixel data */
    public addElement = (x: number, elem: number): void => {
        if (x < this._width) {
            this._matrix[x].push(elem);
        }
    }

    public getOutput = (): void => {
        let result_string: string = '';
        for (let x = 0; x < this._width; x++) {
            for (let y = 0; y < this._height; y++) {
                /* depending from light, pixels will have different corresponding symbols */
                const dot: number = this._matrix[x][y];
                if (dot < 0) {
                    result_string += '-';
                } else if (dot == 0){
                    result_string += ' ';
                } else if (dot < 0.2) {
                    result_string += '.';
                } else if (dot < 0.5) {
                    result_string += '*';
                } else if (dot < 0.8) {
                    result_string += '0';
                } else {
                    result_string += '#'
                }
                result_string += ' '
            }
            result_string += '\n'
        }
        console.log(result_string);
    }
}