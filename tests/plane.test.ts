import Normal from "../src/components/Normal";
import Plane from "../src/components/objects/Plane";
import Point from "../src/components/Point";
import Ray from "../src/components/Ray";
import Vector from "../src/components/Vector";

describe('testing plane object', () => {
    const plane: Plane = new Plane(new Point(0,0,0), new Normal(0,0,1));

    test("Plane has intersection with ray that is before it", () => {
        const ray: Ray = new Ray(new Vector(0,0,3), new Point(0,0,-3));
        expect(plane.intersectionWith(ray)).not.toBeNull();
    });

    test("Plane dont have intersection with ray that is behind it", () => {
        const ray: Ray = new Ray(new Vector(0,0,3), new Point(0,0,3));
        expect(plane.intersectionWith(ray)).toBeNull();
    });

    test("Plane dont have intersection with ray that is parallel to it", () => {
        const ray: Ray = new Ray(new Vector(0,1,0), new Point(0,0,3));
        expect(plane.intersectionWith(ray)).toBeNull();
    });
});