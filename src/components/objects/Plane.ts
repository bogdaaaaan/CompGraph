import Point from "../Point";
import Normal from "../Normal";
import Ray from "../Ray";
import Vector from "../Vector";
import IObject from "./IObject";

/* plane can be defined as a point representing how far the plane is from the world origin and a normal */
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
		/* scalar product of normal and beam direction */
		let denom: number = this._normal.dot(ray.direction);
		
		/* if scalar product == 0, it means vectors are perpendicular */
		if (Math.abs(denom) > this._eps) {

			/* we can find a vector from any point on plane by subtracting center point from this point */
			let center_origin: Vector = this._center.sub(ray.origin);

			/* computing a position of intersection point with ray */
			let t = center_origin.dot(this._normal) / denom;

			return t >= 0 ? t : null;
		}
		return null;
	}

	/* at any point plane returns it's normal */
	public getNormalAtPoint = (p: Point): Normal => this._normal;
}