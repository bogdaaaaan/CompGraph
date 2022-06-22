import Point from "./Point";
import Normal from "./Normal";

export default class Ray {
    private _direction: Normal;
	private _origin: Point;

	constructor(direction: Normal, origin: Point) {
		this._direction = direction;
		this._origin = origin;
	}

    public get origin(): Point { return this._origin };
    public get direction(): Normal { return this._direction };

	/* vec(o) + vec(d) * t, t - number of units from o */
	public getPointAt = (t: number): Point => {
		return this._origin.add(this._direction.mul(t));
	}
}