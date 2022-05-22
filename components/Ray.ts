import Point from "./Point";
import Vector from "./Vector";

export default class Ray {
    private _direction: Vector;
	private _origin: Point;

	constructor(direction: Vector, origin: Point) {
		this._direction = direction.normalize();
		this._origin = origin;
	}

    public get origin(): Point { return this._origin };
    public get direction(): Vector { return this._direction };

	/* vec(o) + vec(d) * t, t - number of units from o */
	public getPointAt = (n: number): Point => {
		return this._origin.add(this._direction.mul(n));
	}

}