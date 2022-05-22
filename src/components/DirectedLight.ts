import Normal from "./Normal";

export default class DirectedLight {
	private _direction: Normal;

	constructor(direction: Normal) {
		this._direction = direction;
	}

	/* light has a direction as a normal */ 
    public get direction(): Normal { return this._direction };
}