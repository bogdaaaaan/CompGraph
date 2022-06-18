import Point from "../Point";
import Normal from "../Normal";
import Ray from "../Ray";
import Vector from "../Vector";
import IObject from "../IObject";

export default class Plane implements IObject {
    private _center: Point;
	private _normal: Normal;
	private _eps: number;

	constructor(center: Point, normal: Normal) {
		this._center = center;
		this._normal = normal;

		this._eps = 0.000001;
	}

	public intersectionWith = (ray: Ray): number => {

		const d: Vector = ray.direction;
		const k: Vector = this._center.sub(ray.origin);

		if (d.dot(this._normal) !== 0) {
			const t: number = (k.dot(this._normal)) / d.dot(this._normal);

			if (t > 0) {
				return t
			} else {
				return null;
			}
		}

		// let denom: number = this._normal.dot(ray.direction);
		// if (denom > this._eps) {
		// 	let p0l0: Vector = this._center.sub(ray.origin);
		// 	let t = p0l0.dot(this._normal) / denom;

		// 	if (t >= 0) {
		// 		return t;
		// 	} else {
		// 		return null;
		// 	}
		// }
		// return null;
	}
	public getNormalAtPoint = (p: Point): Normal => this._normal;
}