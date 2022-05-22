import Point from "./Point";
import Normal from "./Normal";
import Ray from "./Ray";

export default interface IObject {
    intersectionWith(ray: Ray ): number;
    getNormalAtPoint(p: Point): Normal;
}