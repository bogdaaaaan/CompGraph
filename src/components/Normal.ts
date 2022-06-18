import Vector from "./Vector";

export default class Normal extends Vector {
    constructor(x: number, y: number, z: number) {
        super(x,y,z);
    }

    /* create new normal by given coordinates */
    public static create = (x: number, y: number, z: number): Normal => {
		const len: number = Math.sqrt(x * x + y * y + z * z);
		return new Normal(x / len, y / len, z / len);
	}
}