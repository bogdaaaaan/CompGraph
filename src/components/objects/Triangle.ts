import Point from "../Point";
import IObject from "../IObject";
import Normal from "../Normal";
import Ray from "../Ray";
import Vector from "../Vector";

/* triangle can be defined as 3 points written counterclockwise so that pint inside triangle is left to its edges*/
export default class Triangle implements IObject {
    private _v1: Point;
    private _v2: Point;
    private _v3: Point;

    private _eps: number;

    constructor(a: Point, b: Point, c: Point) {
        this._v1 = a;
        this._v2 = b;
        this._v3 = c;

        this._eps = 0.000001;
    }

    intersectionWith(ray: Ray): number {
        const orig: Point = ray.origin;
        const dir: Vector = ray.direction;
        
        const edge1: Vector = this._v2.sub(this._v1);
        const edge2: Vector = this._v3.sub(this._v1);

        const pvec: Vector = dir.cross(edge2);
        const det: number = edge1.dot(pvec)

        if (det < this._eps){
            return null;
        }

        const tvec: Vector = orig.sub(this._v1);
        let u: number = tvec.dot(pvec);

        if (u < 0 || u > det) {
            return null;
        }

        const qvec: Vector = tvec.cross(edge1);
        let v: number = dir.dot(qvec);

        if (v < 0 || u + v > det) {
            return null;
        }

        let t: number = edge2.dot(qvec);
        const inv_det: number = 1 / det;

        t *= inv_det;

        if (t >= 0) {
            return t;
        } else {
            return null;
        }
    }

    getNormalAtPoint(p: Point): Normal {
        const edge1: Vector = this._v2.sub(p);
        const edge2: Vector = this._v3.sub(p);
        return edge1.cross(edge2).toNormal();
    }
}