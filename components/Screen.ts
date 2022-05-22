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

	public getPoint = (x: number, y: number): Point => {
		return new Point(this._center.x, -this._width / 2 + y + 0.5, this._height / 2 - 0.5 - x);
	}
}