import Camera from "./Camera";
import Screen from "./Screen";
import DirectedLight from "./DirectedLight";
import Normal from "./Normal";
import Point from "./Point";
import Vector from "./Vector";
import Ray from "./Ray";
import IObject from "./IObject";

export default class Scene {
    private _objects: IObject[] = [];
	private _result: string;
	private _camera: Camera;
	private _screen: Screen;
	private _light: DirectedLight;

	constructor(camera: Camera, screen: Screen, light: DirectedLight) {
		this._camera = camera;
		this._screen = screen;
		this._light = light;
	}

	public get result (): string { return this._result };

	public addObject = (obj: IObject): void => {
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
		this._result = "";
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

				let object: IObject = null;
				let t_value: number = Infinity;

                for (let i = 0; i < this._objects.length; i++) {
					const _object: IObject = this._objects[i];
					const _t_value: number = _object.intersectionWith(ray);
					
					if (_t_value != null && _t_value < t_value){
						t_value = _t_value;
						object = _object;
					}
                }

				/* if closest objects exists at given position, draw it's part */
				if (object != null) {
					const intersectionPoint: Point = ray.getPointAt(t_value);
					const normalAtPoint: Normal = object.getNormalAtPoint(intersectionPoint);
					row += this.calcLighting(normalAtPoint);
				} else {
					row += ("-");
				}
				row += (" ");
			}
			result += row + ("\n");
		}
		this._result = result;
        console.log(result);
	}
}