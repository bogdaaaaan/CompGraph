import IObject from "../IObject";
import Normal from "../Normal";
import Point from "../Point";
import Ray from "../Ray";
import Vector from "../Vector";

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

		const d2 = d.dot(d);
		const r2 = this._radius ** 2;
		const k2 = k.dot(k);

		const a = d2;
		const b = 2 * d.dot(k);
		const cc = k2 - r2;

		const D = b * b - 4 * a * cc;

		if (D >= 0) {
			return (-b - Math.sqrt(D)) / 2 * a;
		} else {
			return null;
		}
	}

	public getNormalAtPoint = (p: Point): Normal => {
		return p.sub(this._center).toNormal();
	}
}