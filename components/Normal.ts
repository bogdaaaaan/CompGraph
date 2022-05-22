import Vector from "./Vector";

export default class Normal extends Vector {
    constructor(x: number, y: number, z: number) {
        super(x,y,z);
    }

    public static create = (x: number, y: number, z: number): Normal => {
		const len: number = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
		return new Normal(x / len, y / len, z / len);
	}
}