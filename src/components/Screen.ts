import Point from "./Point";
import Ray from "./Ray";

/* screen has posistion, size of visible space and field of view  */
export default class Screen {
	private _location: Point;
	private _width: number;
    private _height: number;
	private _FOV: number;

	constructor(location: Point, width: number, height: number, FOV: number) {
		this._location = location;
		this._width = width;
		this._height = height;
		this._FOV = FOV;
	}

	public get width() { return this._width; }
	public get height() { return this._height; }
	public get location(): Point { return this._location };

	/* points selection goes from left top screen corner to right bottom */ 
	public getPoint = (x: number, y: number): Point => {
		return new Point(-this._width / 2 + x + 0.5, this._height / 2 - y - 0.5, this.location.z - this._FOV);
	}

	/* create rays for specific screen coordinates */
	public getRays = (): {ray: Ray, pos: number}[] => {
		const rays: {ray: Ray, pos: number}[] = [];
		for (let y = 0; y < this._height; y++) {
			for (let x = 0; x < this._width; x++) {
				const _ray: Ray = new Ray(this.getPoint(x,y).sub(this._location), this._location);
				rays.push({ray: _ray, pos: y});
			}
		}
		return rays;
	}
}