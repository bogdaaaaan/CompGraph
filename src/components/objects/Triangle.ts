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

    constructor(a: Point, b: Point, c: Point, n1: Vector, n2: Vector, n3: Vector) {
        this._v1 = a;
        this._v2 = b;
        this._v3 = c;

        this._n1 = n1;
        this._n2 = n2;
        this._n3 = n3;
    }

    /* Möller–Trumbore algorithm */
    intersectionWith = (ray: Ray): number => {
        const orig: Point = ray.origin;
        const dir: Vector = ray.direction;
        
        /* find two vectors that share vertex #1 */
        const edge1: Vector = this._v2.sub(this._v1);
        const edge2: Vector = this._v3.sub(this._v1);

        const pvec: Vector = dir.cross(edge2);
        const det: number = edge1.dot(pvec)

        /* if determinant is zero, ray lies in plane of triangle */
        if (det === 0) return null;

        const inv_det: number = 1 / det;
        const tvec: Vector = orig.sub(this._v1);
        const u: number = tvec.dot(pvec) * inv_det;

        if (u < 0 || u > 1) return null;

        const qvec: Vector = tvec.cross(edge1);
        const v: number = dir.dot(qvec) * inv_det;

        if (v < 0 || u + v > 1) return null;

        /* calculate t parameter */
        const t: number = edge2.dot(qvec) * inv_det;

        return t >= 0 ? t : null;
    }

    getNormalAtPoint = (p: Point): Normal => {
        /* if all normals are zero, return cross product of two verticies sharing p point */
        if (!this._n1.length() && !this._n2.length() && !this._n3.length()) {
            const edge1: Vector = this._v2.sub(p);
            const edge2: Vector = this._v3.sub(p);
            return edge1.cross(edge2).toNormal();
        }

        /* create vectors from each vertex to point and get lengths */
        let l1: number = this._v1.sub(p).length();
        let l2: number = this._v2.sub(p).length();
        let l3: number = this._v3.sub(p).length();

        const l_sum: number = l1 + l2 + l3;

        l1 = l1 / l_sum;
        l2 = l2 / l_sum;
        l3 = l3 / l_sum;

        /* increase normals, add them and normalize the result */
        let a = this._n1.mul(l1)
        let b = this._n2.mul(l2)
        let c = this._n3.mul(l3)

        const res = (a.add(b)).add(c);
        return res.toNormal();
    }

    /* transforms each point and normal depending from transform matrix */
    transform = (matrix: Matrix4x4): void => {
        this._v1 = matrix.multiplyPoint(this._v1);
        this._v2 = matrix.multiplyPoint(this._v2);
        this._v3 = matrix.multiplyPoint(this._v3);

        this._n1 = matrix.multiplyNormal(this._n1);
        this._n2 = matrix.multiplyNormal(this._n2);
        this._n3 = matrix.multiplyNormal(this._n3);
    }
}