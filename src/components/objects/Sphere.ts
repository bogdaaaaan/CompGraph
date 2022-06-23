import IObject from "./IObject";
import Normal from "../Normal";
import Point from "../Point";
import Ray from "../Ray";
import Vector from "../Vector";

/* sphere is defined as center point and radius around it */
export default class Sphere implements IObject {
    private _center: Point;
	private _radius: number;

	constructor(center: Point, radius: number) {
		this._center = center;
		this._radius = radius;
	}

	public intersectionWith = (ray: Ray): number => {
        const o: Point = ray.origin;
		const k: Vector = o.sub(this._center);
		const d: Vector = ray.direction;

		/* t^2 * d^2 + 2tdk + k^2 - r^2 = 0 */
		/* t^2 * a + b * t + c = 0 */

		const d2 = d.dot(d);
		const r2 = this._radius ** 2;
		const k2 = k.dot(k);

		const a = d2;
		const b = 2 * d.dot(k);
		const c = k2 - r2;

		/* discriminant */
		const D = b * b - 4 * a * c;

		/* if D == 0 it means there is only one intersection point */
		if (D >= 0) {
			/* if there is an intersection point, get distance between it and ray origin */
			return (-b - Math.sqrt(D)) / 2 * a;
		} else {
			return null;
		}
	}

	public getNormalAtPoint = (p: Point): Normal => { return p.sub(this._center).toNormal() }
}