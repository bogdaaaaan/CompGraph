import Normal from "../src/components/Normal";
import Sphere from "../src/components/objects/Sphere";
import Point from "../src/components/Point";
import Ray from "../src/components/Ray";

describe('testing multiple objects render', () => {
    const normal: Normal = new Normal(0,0,0);

    test("Ray intersects with both objects but distance to the closest is lesser", () => {
        const sphere1: Sphere = new Sphere(new Point(0,0,-20), 30);
        const sphere2: Sphere = new Sphere(new Point(0,0,20), 30);

        const ray: Ray = new Ray(Normal.create(0,0,-1), new Point(0,0,60));
        const t1 = sphere1.intersectionWith(ray);
        const t2 = sphere2.intersectionWith(ray);
        expect(t2 < t1);
    });

    test("Ray intersects with only one object", () => {
        const sphere1: Sphere = new Sphere(new Point(0,0,-20), 30);
        const sphere2: Sphere = new Sphere(new Point(50,0,20), 30);

        const ray: Ray = new Ray(Normal.create(0,0,-1), new Point(0,0,60));
        const t1 = sphere1.intersectionWith(ray);
        const t2 = sphere2.intersectionWith(ray);
        expect(t2).toBeNull();
        expect(t1).not.toBeNull();
    });

    test("Ray intersects both objects on edges", () => {
        const sphere1: Sphere = new Sphere(new Point(-30,0,-20), 30);
        const sphere2: Sphere = new Sphere(new Point(30,0,20), 30);

        const ray: Ray = new Ray(Normal.create(0,0,-1), new Point(0,0,60));

        const t1 = sphere1.intersectionWith(ray);
        const t2 = sphere2.intersectionWith(ray);

        expect(t2).not.toBeNull();
        expect(t1).not.toBeNull();
    });
});