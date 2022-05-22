import Normal from "../src/components/Normal";
import Sphere from "../src/components/objects/Sphere";
import Point from "../src/components/Point";
import Ray from "../src/components/Ray";
import Vector from "../src/components/Vector";

describe('testing sphere object', () => {
    const sphere: Sphere = new Sphere(new Point(0,0,0), 10);
    /* need's to create "normal" entity so it could be extend from vector in further testing cases */
    /* cool feature jest, thnx */
    const normal: Normal = new Normal(0,0,0);

    test("Sphere has intersection with ray that is hitting it", () => {
        const ray: Ray = new Ray(new Vector(0,0,-1), new Point(0,0,20));
        expect(sphere.intersectionWith(ray)).not.toBeNull();
    });

    test("Sphere dont have intersection with ray that is missing it", () => {
        const ray: Ray = new Ray(new Vector(0,5,1), new Point(0,0,20));
        expect(sphere.intersectionWith(ray)).toBeNull();
    });
});