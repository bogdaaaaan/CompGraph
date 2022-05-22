import Vector from "./Vector";

export default class Point {
    private _x: number;
    private _y: number;
    private _z: number;

    constructor(x: number, y: number, z:number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    public get x () { return this._x }
    public get y () { return this._y }
    public get z () { return this._z }

    /* By adding vector to a point we get new point */
    public add = (v: Vector): Point => new Point(this.x + v.x, this.y + v.y, this.z + v.z); 
    /* By subtracting point from point we get new vector */
    public sub = (p: Point): Vector => new Vector(this.x - p.x, this.y - p.y, this.z - p.z); 
}
