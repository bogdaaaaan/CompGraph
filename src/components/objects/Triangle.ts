import IObject from "./IObject";
import Matrix4x4 from "../Matrix4x4";
import Normal from "../Normal";
import Point from "../Point";
import Ray from "../Ray";
import Vector from "../Vector";

export default class Triangle implements IObject {
    private _v1: Point;
    private _v2: Point;
    private _v3: Point;

    private _n1: Vector;
    private _n2: Vector;
    private _n3: Vector;

    private _u: number;
    private _v: number;
    private _eps: number;


    constructor(p1: Point, p2: Point, p3: Point, v1: Vector, v2: Vector, v3: Vector) {
        this._v1 = p1;
        this._v2 = p2;
        this._v3 = p3;

        this._n1 = v1;
        this._n2 = v2;
        this._n3 = v3;

        this._eps = 0.00001;
    }

    public transform = (matrix: Matrix4x4): void => {
        this._v1 = matrix.multiplyPoint(this._v1);
        this._v2 = matrix.multiplyPoint(this._v2);
        this._v3 = matrix.multiplyPoint(this._v3);
        this._n1 = matrix.multiplyVector(this._n1);
        this._n2 = matrix.multiplyVector(this._n2);
        this._n3 = matrix.multiplyVector(this._n3);
    }

    public intersectionWith = (ray: Ray): number => {
        const o: Point = ray.origin;
        const d: Vector = ray.direction;
        
        const edge1: Vector = this._v2.sub(this._v1);
        const edge2: Vector = this._v3.sub(this._v1);

        const pvec: Vector = d.cross(edge2);
        const det: number = edge1.dot(pvec);

        if (det< this._eps){
            return null;
        }

        const tvec: Vector = o.sub(this._v1);

        let u: number = tvec.dot(pvec);

        if (u < 0 || u > det) {
            return null;
        }

        const qvec: Vector = tvec.cross(edge1);
        let v: number = d.dot(qvec);

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

    public getNormalAtPoint = (p: Point): Normal => {
        return this._n2.mul(this._u).add(this._n3.mul(this._v).add(this._n1.mul(1-this._v-this._u))).toNormal();
    }
}