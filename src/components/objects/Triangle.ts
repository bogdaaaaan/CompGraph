import Point from "../Point";
import IObject from "./IObject";
import Normal from "../Normal";
import Ray from "../Ray";
import Vector from "../Vector";
import Matrix4x4 from "../Matrix4x4";

/* triangle can be defined as 3 points written counterclockwise so that point inside triangle is left to its edges*/
export default class Triangle implements IObject {
    private _v1: Point;
    private _v2: Point;
    private _v3: Point;

    private _n1: Vector;
    private _n2: Vector;
    private _n3: Vector;

    private _v: number;
    private _u: number;
    private _eps: number;

    constructor(a: Point, b: Point, c: Point, n1: Vector, n2: Vector, n3: Vector) {
        this._v1 = a;
        this._v2 = b;
        this._v3 = c;

        this._n1 = n1;
        this._n2 = n2;
        this._n3 = n3;

        this._eps = 0.000001;
    }

    transform = (matrix: Matrix4x4) => {
        this._v1 = matrix.multiplyPoint(this._v1);
        this._v2 = matrix.multiplyPoint(this._v2);
        this._v3 = matrix.multiplyPoint(this._v3);
        this._n1 = matrix.multiplyVector(this._n1);
        this._n2 = matrix.multiplyVector(this._n2);
        this._n3 = matrix.multiplyVector(this._n3);
    }

    intersectionWith = (ray: Ray): number => {
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
        u *= inv_det;
        v *= inv_det;

        this._u = u;
        this._v = v;

        if (t >= 0) {
            return t;
        } else {
            return null;
        }
    }

    getNormalAtPoint = (p: Point): Normal => {
        // const a = this._n2.mul(this._u);
        // const b = this._n3.mul(this._v);
        // const c = this._n1.mul(1-this._u-this._v);
        // const res = (a.add(b.add(c))).toNormal();

        // return res;
        const edge1: Vector = this._v2.sub(p);
        const edge2: Vector = this._v3.sub(p);
        return edge1.cross(edge2).toNormal();
    }
}