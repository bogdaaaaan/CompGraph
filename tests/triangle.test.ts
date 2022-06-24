import Matrix4x4 from "../src/components/Matrix4x4";
import Normal from "../src/components/Normal";
import Triangle from "../src/components/objects/Triangle";
import Point from "../src/components/Point";
import Ray from "../src/components/Ray";
import Vector from "../src/components/Vector";

describe('testing triangle object', () => {
    const triangle: Triangle = new Triangle(new Point(-10,0,0),new Point(10,0,0), new Point(0,20,0), new Vector(0,0,0), new Vector(0,0,0), new Vector(0,0,0));
    const normal: Normal = new Normal(0,0,0);
    
    test("Triangle has intersection with ray that is before it", () => {
        const ray: Ray = new Ray(Normal.create(0,0,-1), new Point(0,5,5));
        expect(triangle.intersectionWith(ray)).not.toBeNull();
    });

    test("Triangle has intersection with ray that is before it in one of the vertices", () => {
        const ray: Ray = new Ray(Normal.create(0,0,-1), new Point(-10,0,1));
        expect(triangle.intersectionWith(ray)).not.toBeNull();
    });

    test("Triangle dont have intersection with ray that is behind it", () => {
        const ray: Ray = new Ray(Normal.create(0,0,-1), new Point(0,5,-5));
        expect(triangle.intersectionWith(ray)).toBeNull();
    });

    test("Triangle dont have intersection with ray that is parallel to it", () => {
        const ray: Ray = new Ray(Normal.create(0,1,0), new Point(0,0,3));
        expect(triangle.intersectionWith(ray)).toBeNull();
    });

    test("Triangle returns correct normal", () => {
        const ray: Ray = new Ray(Normal.create(0,0,-1), new Point(0,5,5));
        const intersection_point: Point = ray.getPointAt(triangle.intersectionWith(ray));
        const normal_at_point: Normal = triangle.getNormalAtPoint(intersection_point);
        
        expect(normal_at_point.x === 0);
        expect(normal_at_point.y === 0);
        expect(normal_at_point.z === 1);
    });

    
});