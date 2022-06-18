import Normal from "./Normal";

export default class Vector {
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

    /* addition of two vectors results in adding their corresponding coordinates */
    public add = (v: Vector): Vector => new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    /* subtraction of two vectors results in subtracting their corresponding coordinates */
    public sub = (v: Vector): Vector => new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    /* multiplication of vector to a number results in multiplication of number to vectors corresponding coordinates */
    public mul = (k: number): Vector => new Vector(this.x * k, this.y * k, this.z * k);
    /* scalar multiplication of two vectors results in multiplication of their corresponding coordinates */
    public dot = (v: Vector): number => this.x * v.x + this.y * v.y + this.z * v.z;

    /* get new vector that is perpendicular to this and given */
    public cross = (v: Vector): Vector => {
        let cx = this.y * v.z - this.z * v.y;
		let cy = this.z * v.x - this.x * v.z;
		let cz = this.x * v.y - this.y * v.x;

		return new Vector(cx, cy, cz);
    }

    /* changing lengths of vector to 1 */
    public normalize = (): Vector => {
        let len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return new Vector(this.x / len, this.y / len, this.z / len);
    }

    /* Transform vector into normal */
    public toNormal = (): Normal => {
		return Normal.create(this._x, this._y, this._z);
	}
}