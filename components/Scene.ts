import Camera from "./Camera";
import Screen from "./Screen";
import DirectedLight from "./DirectedLight";
import Normal from "./Normal";
import Point from "./Point";
import Vector from "./Vector";
import Ray from "./Ray";

export default class Scene {
	// TODO: ANY => OBJECT
    private _objects: any[] = [];
	private _camera: Camera;
	private _screen: Screen;
	private _light: DirectedLight;

	constructor(camera: Camera, screen: Screen, light: DirectedLight) {
		this._camera = camera;
		this._screen = screen;
		this._light = light;
	}

	public addObject = (obj: any): void => {
        this._objects.push(obj);
    }

	private calcLighting = (normalAtPoint: Normal): string => {
		const dotProduct: number = this._light.direction.dot(normalAtPoint);
		if (dotProduct < 0) {
			return ' ';
		} else if (dotProduct < 0.2) {
			return '.';
		} else if (dotProduct < 0.5) {
			return '*';
		} else if (dotProduct < 0.8) {
			return '0';
		} else {
			return '#';
		}
	}

	public render = (): void => {
		const origin: Point = this._camera.location;

        let result: string = '';
		/* for each row */
		for (let y = 0; y < this._screen.height; y++) {
            let row: string = '';
			/* for each element in row */
			for (let x = 0; x < this._screen.width; x++) {
				/* create ray for each pixel of screen */
				const dest: Point = this._screen.getPoint(x, y);
				const direction: Vector = dest.sub(origin);
				const ray: Ray = new Ray(direction, origin);

				/* find nearest object ray intersects with */
				const distances: any[] = [];

                for (let i = 0; i < this._objects.length; i++) {
                    const object = this._objects[i];
					const t_value: number = object.intersectionWith(ray);

					if (t_value != null) distances.push({obj: object, value: t_value});
                }

				/* if multiple objects on scene, draw only closest parts */
				if (distances.length) {
					const val = Math.min(...distances.map(x => x.value));
					const obj = distances.filter(x => x.value === val)[0].obj;

					const intersectionPoint: Point = ray.getPointAt(val);
					const normalAtPoint: Normal = obj.getNormalAtPoint(intersectionPoint);
						
					row += this.calcLighting(normalAtPoint);
				} else {
					row += ("-");
				}
				row += (" ");
			}
			result += row + ("\n");
		}
        console.log(result);
	}
}