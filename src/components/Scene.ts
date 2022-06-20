import Camera from "./Camera";
import Screen from "./Screen";
import DirectedLight from "./DirectedLight";
import Normal from "./Normal";
import Point from "./Point";
import Vector from "./Vector";
import Ray from "./Ray";
import IObject from "./objects/IObject";
import IOutput from '../utils/IOutput';

export default class Scene {
    private _objects: IObject[] = [];
	private _camera: Camera;
	private _screen: Screen;
	private _light: DirectedLight;
	private _output: IOutput;

	constructor(camera: Camera, screen: Screen, light: DirectedLight, output: IOutput) {
		this._camera = camera;
		this._screen = screen;
		this._light = light;
		this._output = output;
	}

	public addObject = (obj: IObject): void => {
        this._objects.push(obj);
    }

	private calcLighting = (normalAtPoint: Normal): number => {
		const dotProduct = this._light.direction.dot(normalAtPoint);
	
		if (dotProduct < 0) {
			return 0;
		} else {
			return dotProduct;
		}
	}

	public render = (): void => {
		const origin: Point = this._camera.location;

		/* for each row */
		for (let y = 0; y < this._screen.height; y++) {
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
					const light: number = this.calcLighting(normalAtPoint);

					this._output.addElement(y, light);
				} else {
					this._output.addElement(y, -1);
				}
			}
		}
		this._output.displayRenderResult();
	}
}