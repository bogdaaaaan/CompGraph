import Triangle from "./objects/Triangle";
import Point from "./Point";
import Vector from "./Vector";
import Normal from "./Normal";

export default class Matrix4x4 {
    private _matrix: number[][];
    constructor() {
        this._matrix = [
            [1,0,0,0],
            [0,1,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
    }

    /* two matrices multiplication */
    public multiplyMatrix = (other_matrix: number[][]): void => {
        /* resulting matrix */
        const result: number[][] = [];
        this._matrix.map(_ => result.push(new Array(this._matrix.length).fill(0)))

        /* multiply matrices */
        for (let i = 0; i < this._matrix.length; i++) {
            for (let j = 0; j < other_matrix[0].length; j++) {
                for (let k = 0; k < other_matrix.length; k++) {
                    result[i][j] += this._matrix[i][k] * other_matrix[k][j];
                }
            }
        }

        /* change matrix */
        this._matrix = result;
    }

    /* matrix on vector multiplication */
    public multiplyVector = (v: Vector): Vector => {
        const res: number[] = new Array(this._matrix.length).fill(0);
        const vector4: number[] = [v.x, v.y, v.z, 1];

        /* multiply each value from each matrix row by each vector4 value */
        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < vector4.length; j++) {
                res[i] += this._matrix[i][j] * vector4[j];
            }
        }

        return new Vector(res[0], res[1], res[2]);
    }

    /* matrix on vector multiplication */
    public multiplyNormal = (v: Vector): Normal => {
        const res: number[] = new Array(this._matrix.length).fill(0);
        const vector4: number[] = [v.x, v.y, v.z, 1];

        /* multiply each value from each matrix row by each vector4 value */
        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < vector4.length; j++) {
                res[i] += this._matrix[i][j] * vector4[j];
            }
        }

        return Normal.create(res[0], res[1], res[2]);
    }

    public multiplyPoint = (p: Point): Point => {
        const res: number[] = new Array(this._matrix.length).fill(0);
        const vector4: number[] = [p.x, p.y, p.z, 1];

        for (let i = 0; i < this._matrix.length; i++) {
            for (let j = 0; j < 4; j++) {
                res[i] += this._matrix[i][j] * vector4[j];
            }
        }

        return new Point(res[0], res[1], res[2]);
    }

    public transformObject = (vertex_list: number[][], normal_list: number[][], index_list: number[][][]): Triangle[] => {
        const poligons: Triangle[] = [];
        /* read indexes and create triangles with data from lists */
        index_list.map((wrapper: number[][]) => {
            const points: Point[] = [];
            const normals: Normal[] = [];
            wrapper.map((indexes: number[]) => {
                const vertex: number[] = vertex_list[indexes[0] - 1]
                const normal: number[] = normal_list[indexes[1] - 1]
                
                /* create already transformed triangles */
                points.push(this.multiplyPoint(new Point(vertex[0], vertex[1], vertex[2])))
                normals.push(this.multiplyNormal(new Vector(normal[0], normal[1], normal[2])));
            })
            // const cntr_clockwise_p: Point[] = points.reverse();
            // const cntr_clockwise_n: Normal[] = normals.reverse();

            poligons.push(new Triangle(points[0], points[1], points[2], normals[0], normals[1], normals[2]));
        })
        return poligons;
    }

    public scale = (s: number): void => {
        const scaled_matrix: number[][] = [
            [s,0,0,0],
            [0,s,0,0],
            [0,0,s,0],
            [0,0,0,1]
        ]
        this.multiplyMatrix(scaled_matrix);
    }

    public move = (x: number, y: number, z: number): void => {
        const moved_matrix: number[][] = [
            [1,0,0,x],
            [0,1,0,y],
            [0,0,1,z],
            [0,0,0,1],
        ]
        this.multiplyMatrix(moved_matrix);
    }

    public rotate = (x_angle: number, y_angle: number, z_angle: number): void => {
        if (x_angle) this.rotateX(x_angle);
        if (y_angle) this.rotateY(y_angle);
        if (z_angle) this.rotateZ(z_angle);
        
    }

    public rotateX = (x_angle: number): void => {
        const rad: number = (x_angle) * (Math.PI / 180);
        const x_rotated_matrix: number[][] = [
            [1,0,0,0],
            [0, Math.cos(rad), -Math.sin(rad), 0],
            [0, Math.sin(rad), Math.cos(rad), 0],
            [0,0,0,1]
        ]
        this.multiplyMatrix(x_rotated_matrix);
    }

    public rotateY = (y_angle: number): void => {
        const rad: number = (y_angle) * (Math.PI / 180);
        const y_rotated_matrix: number[][] = [
            [Math.cos(rad), 0, Math.sin(rad), 0],
            [0,1,0,0],
            [-Math.sin(rad), 0, Math.cos(rad), 0],
            [0,0,0,1],
        ]
        this.multiplyMatrix(y_rotated_matrix);
    }

    public rotateZ = (z_angle: number): void => {
        const rad: number = (z_angle) * (Math.PI / 180);
        const z_rotated_matrix: number[][] = [
            [Math.cos(rad), -Math.sin(rad), 0, 0],
            [Math.sin(rad), Math.cos(rad), 0, 0],
            [0,0,1,0],
            [0,0,0,1]
        ]
        this.multiplyMatrix(z_rotated_matrix);
    }
}