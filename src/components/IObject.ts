import Point from "./Point";
import Normal from "./Normal";
import Ray from "./Ray";

export default interface IObject {
    /* each object should be able to return normal at given point and check for intersection with ray */
    intersectionWith(ray: Ray ): number;
    getNormalAtPoint(p: Point): Normal;
}