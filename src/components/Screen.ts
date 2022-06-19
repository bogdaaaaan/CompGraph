import Point from "./Point";

export default class Screen {
    private _width: number;
    private _height: number;
    private _center: Point;

	constructor(width: number, height: number, center: Point) {
		this._width = width;
		this._height = height;
		this._center = center;
	}

    public get width() { return this._width; }
	public get height() { return this._height; }

	/* points selection goes from left top screen corner to right bottom */ 
	public getPoint = (x: number, y: number): Point => {
		return new Point(-this._width / 2 + x + 0.5, this._height / 2 - y - 0.5, this._center.z);
	}
}