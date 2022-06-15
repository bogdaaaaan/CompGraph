import Point from "../Point";
import Normal from "../Normal";
import Ray from "../Ray";
import Vector from "../Vector";
import IObject from "./IObject";

export default class Plane implements IObject {
    private _center: Point;
	private _normal: Normal;

	constructor(center: Point, normal: Normal) {
		this._center = center;
		this._normal = normal;
	}

	public intersectionWith = (ray: Ray): number => {
		let denom: number = this._normal.dot(ray.direction);
		if (Math.abs(denom) > 1e-6) {
			let p0l0: Vector = this._center.sub(ray.origin);
			let t = p0l0.dot(this._normal) / denom;

			if (t >= 0) {
				return t;
			} else {
				return null;
			}
		}
		return null;
	}
	public getNormalAtPoint = (p: Point): Normal => this._normal;
}