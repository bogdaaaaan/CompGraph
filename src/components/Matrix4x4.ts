import Point from "./Point";
import Vector from "./Vector";

export default class Matrix4x4 {
    private _matrix: number[][];

    constructor() {
        this._matrix = null;
    }

    public multiplyMatrices = (other_matrix: number[][]): void => {
        let result: number[][] = [];
        for (let i = 0; i < this._matrix.length; i++) {
            result.push([]);
        }

        for (let i = 0; i < this._matrix.length; i++) {
            for (let j = 0; j < other_matrix[0].length; j++) {
                let cell: number = 0;
                for (let k = 0; k < other_matrix.length; k++) {
                    cell += this._matrix[i][k] * other_matrix[i][j];
                }
                result[i][j] = cell;
            }
        }
        this._matrix = result;
    }

    public multiplyVector = (v: Vector): Vector => {
        let result: number[] = [];
        let vector4: number[] = [v.x, v.y, v.z, 1];

        for (let i = 0; i < this._matrix.length; i++) {
            let cell: number = 0;
            for (let j = 0; j < 4; j++) {
                cell += this._matrix[i][j] * vector4[j];
            }
            result[i] = cell;
        }

        return new Vector(result[0], result[1], result[2]).normalize();
    }

    public multiplyPoint = (p: Point): Point => {
        let result: number[] = [];
        let vector4: number[] = [p.x, p.y, p.z, 1];

        for (let i = 0; i < this._matrix.length; i++) {
            let cell: number = 0;
            for (let j = 0; j < 4; j++) {
                cell += this._matrix[i][j] * vector4[j];
            }
            result[i] = cell;
        }

        return new Point(result[0], result[1], result[2]);
    }

    public move = (x:number, y:number, z:number): void => {
        const new_move: number[][] = [
            [1,0,0,x],
            [0,1,0,y],
            [0,0,1,z],
            [0,0,0,1]
        ]

        if (this._matrix === null){
            this._matrix = new_move;
        }
        else {
            this.multiplyMatrices(new_move);
        }
    }

    public scale = (x:number, y:number, z:number): void => {
        const new_move: number[][] = [
            [x,0,0,0],
            [0,y,0,0],
            [0,0,z,0],
            [0,0,0,1]
        ]

        if (this._matrix === null){
            this._matrix = new_move;
        }
        else {
            this.multiplyMatrices(new_move);
        }
    }

    public rotateX = (x_angle: number): void => {
        const rad: number = (x_angle) * (Math.PI / 180) ;
        const new_move: number[][] = [
            [Math.cos(rad), -Math.sin(rad), 0, 0],
            [Math.sin(rad), Math.cos(rad), 0, 0],
            [0,0,1,0],
            [0,0,0,1]
        ]

        if (this._matrix === null){
            this._matrix = new_move;
        }
        else {
            this.multiplyMatrices(new_move);
        }
    }
    
    public rotateY = (y_angle: number): void => {
        const rad: number = (y_angle) * (Math.PI / 180) ;
        const new_move: number[][] = [
            [Math.cos(rad), 0, Math.sin(rad), 0],
            [0,1,0,0],
            [-Math.sin(rad), 0, Math.cos(rad), 0],
            [0,0,0,1],
        ]

        if (this._matrix === null){
            this._matrix = new_move;
        }
        else {
            this.multiplyMatrices(new_move);
        }
    }
    
    public rotateZ = (z_angle: number): void => {
        const rad: number = (z_angle) * (Math.PI / 180) ;
        const new_move: number[][] = [
            [1,0,0,0],
            [0, Math.cos(rad), -Math.sin(rad), 0],
            [0, Math.sin(rad), Math.cos(rad), 0],
            [0,0,0,1]
        ]

        if (this._matrix === null){
            this._matrix = new_move;
        }
        else {
            this.multiplyMatrices(new_move);
        }
    }
}