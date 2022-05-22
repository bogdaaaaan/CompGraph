import Point from "./Point";

export default class Camera {
	private _location: Point;

	constructor(location: Point) {
		this._location = location;
	}

	/* Camera has location as a point */
	public get location(): Point { return this._location };
}