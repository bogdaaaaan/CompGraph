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

    intersectionWith = (ray: Ray): number => {
        const orig: Point = ray.origin;
        const dir: Vector = ray.direction;
        
        const edge1: Vector = this._v2.sub(this._v1);
        const edge2: Vector = this._v3.sub(this._v1);

        const pvec: Vector = dir.cross(edge2);
        const det: number = edge1.dot(pvec)

        if (det === 0){
            return null;
        }
        const inv_det: number = 1 / det;

        const tvec: Vector = orig.sub(this._v1);
        
        let u: number = tvec.dot(pvec) * inv_det;

        if (u < 0 || u > 1) {
            return null;
        }

        const qvec: Vector = tvec.cross(edge1);
        let v: number = dir.dot(qvec) * inv_det;

        if (v < 0 || u + v > 1) {
            return null;
        }

        let t: number = edge2.dot(qvec) * inv_det;

        this._u = u;
        this._v = v;

        if (t >= 0) {
            return t;
        } else {
            return null;
        }
    }

    getNormalAtPoint = (p: Point): Normal => {

        const edge1: Vector = this._v2.sub(p);
        const edge2: Vector = this._v3.sub(p);
        return edge1.cross(edge2).toNormal();
        //return this._n2.mul(this._u).add(this._n3.mul(this._v).add(this._n1.mul(1-this._v-this._u))).toNormal();  // barycentric normal
    }

    transform = (matrix: Matrix4x4): void => {
        this._v1 = matrix.multiplyPoint(this._v1);
        this._v2 = matrix.multiplyPoint(this._v2);
        this._v3 = matrix.multiplyPoint(this._v3);

        this._n1 = matrix.multiplyNormal(this._n1);
        this._n2 = matrix.multiplyNormal(this._n2);
        this._n3 = matrix.multiplyNormal(this._n3);
    }

}