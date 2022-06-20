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
	private _screen: Screen;
	private _light: DirectedLight;
	private _output: IOutput;

	constructor(camera: Screen, light: DirectedLight, output: IOutput) {
		this._screen = camera;
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
		const rays: {ray: Ray, pos: number}[] = this._screen.getRays();
		/* for each ray thrown at specific screen coordinates */
		rays.map(element => {
			let object: IObject = null;
			let t_value: number = Infinity;
			for (let i = 0; i < this._objects.length; i++) {
				const _object: IObject = this._objects[i];
				const _t_value: number = _object.intersectionWith(element.ray);
	
				if (_t_value != null && _t_value < t_value){
					t_value = _t_value;
					object = _object;
				}
			}

			/* if closest objects exists at given position, draw it's part */
			if (object != null) {
				const intersectionPoint: Point = element.ray.getPointAt(t_value);
				const normalAtPoint: Normal = object.getNormalAtPoint(intersectionPoint);
				const light: number = this.calcLighting(normalAtPoint);

				this._output.addElement(element.pos, light);
			} else {
				this._output.addElement(element.pos, -1);
			}
		})
		this._output.displayRenderResult();
	}
}