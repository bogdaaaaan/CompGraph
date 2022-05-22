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

    public add = (v: Vector): Vector => new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    public sub = (v: Vector): Vector => new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    public mul = (k: number): Vector => new Vector(this.x * k, this.y * k, this.z * k);
    public dot = (v: Vector): number => this.x * v.x + this.y * v.y + this.z * v.z;

    public cross = (v: Vector): Vector => {
        let cx = this.y * v.z - this.z * v.y;
		let cy = this.z * v.x - this.x * v.z;
		let cz = this.x * v.y - this.y * v.x;

		return new Vector(cx, cy, cz);
    }

    public normalize = (): Vector => {
        let len = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
        return new Vector(this.x / len, this.y / len, this.z / len);
    }

    public toNormal = (): Normal => {
		return Normal.create(this._x, this._y, this._z);
	}
}