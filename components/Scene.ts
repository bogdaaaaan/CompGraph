import Camera from "./Camera";
import Screen from "./Screen";
import DirectedLight from "./DirectedLight";
import Normal from "./Normal";
import Point from "./Point";
import Vector from "./Vector";
import Ray from "./Ray";

export default class Scene {
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
		for (let x = 0; x < this._screen.height; x++) {
            let row: string = '';
			for (let y = 0; y < this._screen.width; y++) {
				const dest: Point = this._screen.getPoint(x, y);
				const direction: Vector = dest.sub(origin);
				const ray: Ray = new Ray(direction, origin);

                for (let i = 0; i < this._objects.length; i++) {
                    const object = this._objects[i];
                    const tVal: number = object.intersectionWith(ray);

					if (tVal != null) {
						const intersectionPoint: Point = ray.getPointAt(tVal);
						const normalAtPoint: Normal = object.getNormalAtPoint(intersectionPoint);
						
                        row += this.calcLighting(normalAtPoint);
						break;
					} else {
						row += ("-");
					}
                }
				row += (" ");
			}
			result += row + ("\n");
		}
        console.log(result);
	}
}