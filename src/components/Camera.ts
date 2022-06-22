import Point from "./Point";
import Ray from "./Ray";

/* camera has posistion, size of visible space and field of view  */
export default class Camera {
	private _location: Point;
	private _width: number;
    private _height: number;

	constructor(location: Point, width: number, height: number) {
		this._location = location;
		this._width = width;
		this._height = height;
	}

	public get width() { return this._width; }
	public get height() { return this._height; }
	public get location(): Point { return this._location };

	/* points selection goes from left top screen corner to right bottom */ 
	public getPoint = (x: number, y: number): Point => {
		return new Point(-this._width / 2 + x + 0.5, this._height / 2 - y - 0.5, this.width);
	}

	/* create rays for specific screen coordinates */
	public getRays = (): any[] => {
		const rays: any[] = [];
		for (let y = 0; y < this._height; y++) {
			for (let x = 0; x < this._width; x++) {
				const _ray: Ray = new Ray(this.getPoint(x,y).sub(this._location).toNormal(), this._location);
				rays.push({ray: _ray, pos:{x: x, y: y}});
			}
		}
		return rays;
	}
}