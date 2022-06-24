import Camera from "./Camera";
import DirectedLight from "./DirectedLight";
import Normal from "./Normal";
import Point from "./Point";
import Ray from "./Ray";
import IObject from "./objects/IObject";
import IOutput from '../utils/IOutput';

/* main scene has camera, light and output */
export default class Scene {
    private _objects: IObject[] = [];
	private _camera: Camera;
	private _light: DirectedLight;
	private _output: IOutput;

	constructor(camera: Camera, light: DirectedLight, output: IOutput) {
		this._camera = camera;
		this._light = light;
		this._output = output;
	}

	/* adds object to list of objects */
	public addObject = (obj: IObject): void => {
        this._objects.push(obj);
    }

	/* depending on difference between light and object's normal, calculates lighting */
	private calcLighting = (normalAtPoint: Normal): number => {
		const dotProduct = this._light.direction.dot(normalAtPoint);
		if (dotProduct < 0) {
			return 0;
		} else {
			return dotProduct;
		}
	}


	/* calculates shadows */
	public caclShading = (ray: Ray, obj: IObject): Boolean => {
		/* check all other objects untill first intersection found */
		for (let i = 0; i < this._objects.length; i++) {
			if (this._objects[i] !== obj) {
				const _t_value: number = this._objects[i].intersectionWith(ray);
				if (_t_value > 0) return true;
			}
		}
		return false;
	}

	/* main method */
	public render = (): void => {
		const rays: any[] = this._camera.getRays();
		
		let counter = 0;
		/* for each ray thrown at specific screen coordinates */
		rays.map((element, indx) => {

			/* helper console output */
			counter++;
			if (counter === Math.round(rays.length / 100)) {
				console.log(`Step ${indx+1}/${rays.length}`);
				counter = 0;
			}

			/* finding closest object */
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

				/* if ray thrown from intersection point in direction of light intersects another object - this object is in shadow */
				if (this.caclShading(new Ray(this._light.direction, intersectionPoint), object)) {
				 	this._output.addElement(element.pos.y, element.pos.x, 0);
				} else {
					const light: number = this.calcLighting(normalAtPoint);
					this._output.addElement(element.pos.y, element.pos.x, light);
				}
			} else {
				this._output.addElement(element.pos.y, element.pos.x, -1);
			}
		})
		this._output.getOutput();
	}
}