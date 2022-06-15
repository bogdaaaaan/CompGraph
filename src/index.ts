import { argv } from "process";
import Normal from "./components/Normal";
import Point from "./components/Point";
import Sphere from "./components/objects/Sphere";
import Screen from "./components/Screen";
import Camera from "./components/Camera";
import DirectedLight from "./components/DirectedLight";
import Scene from "./components/Scene";
import Plane from "./components/objects/Plane";
import Vector from "./components/Vector";
import Triangle from "./components/objects/Triangle";
//import ConsoleOutput from './utils/ConsoleOutput';
import FileOutput from './utils/FileOutput';
import ObjectReader from './utils/ObjectReader';
import IOutput from "./utils/IOutput";
import Matrix4x4 from "./components/Matrix4x4";

let input_file: string = "";
let output_file: string = "";

argv.forEach((val, index) => {
    if (val.startsWith("--source=")){
        input_file=val.split("=")[1];
    } else if (val.startsWith("--output")){
        output_file = val.split("=")[1];
    } 
});

const sphere: Sphere = new Sphere(new Point(0, 0, 0), 50);
const sphere2: Sphere = new Sphere(new Point(4, 0, 0), 10);

const plane: Plane = new Plane(new Point(0, 0, 0), Normal.create(-1, 0, 0));
const plane2: Plane = new Plane(new Point(9, 0, 0), Normal.create(-1, -1, -1));

const triangle: Triangle = new Triangle(new Point(5, 0, 0), new Point(5, 14, 0), new Point(6, 0, 12), new Vector(0,0,0),new Vector(0,0,0),new Vector(0,0,0));
const triangle2: Triangle = new Triangle(new Point(6, -7, -5), new Point(6, 10, -5), new Point(9, -6, 7),new Vector(0,0,0),new Vector(0,0,0),new Vector(0,0,0));

const screen: Screen = new Screen(300, 300, new Point(450, 0, 0));
const camera: Camera = new Camera(new Point(550, 0,0));
const light: DirectedLight = new DirectedLight(Normal.create(1, 1, 1));

//const out: IOutput = new ConsoleOutput(screen.width, screen.height);
const out: IOutput = new FileOutput(screen.width, screen.height, output_file);
const scene: Scene = new Scene(camera, screen, light, out);

const reader: ObjectReader = new ObjectReader(input_file);

const poligons: Triangle[] = reader.readFile();
console.log(poligons.length);

const matrix: Matrix4x4 = new Matrix4x4();
matrix.move(100, -150,0);
matrix.rotateX(55);
matrix.scale(600,600,600);

for (let t = 0; t < poligons.length; t++) {
    poligons[t].transform(matrix);
    scene.addObject(poligons[t]);
}

scene.render();
/*                   
    y ^              
      |              
      |              
      |              
      0 ----------> x
     /               
    /                
   /                 
  v                  
z                    
*/