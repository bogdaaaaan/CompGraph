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
import ConsoleOutput from './utils/ConsoleOutput';
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

const screen: Screen = new Screen(50, 50, new Point(0, 0, 30));
const camera: Camera = new Camera(new Point(0, 0, 60));
const light: DirectedLight = new DirectedLight(Normal.create(1, 1, 1));
const out: IOutput = new ConsoleOutput(screen.width, screen.height);
//const out: IOutput = new FileOutput(screen.width, screen.height, output_file);

const scene: Scene = new Scene(camera, screen, light, out);
//const reader: ObjectReader = new ObjectReader(input_file);

const triangle1: Triangle = new Triangle(new Point(-20, 0, 0), new Point(0, 25, 0), new Point(20, 0, 0), new Vector(0,0,0), new Vector(0,0,0), new Vector(0,0,0));
//const triangle2: Triangle = new Triangle(new Point(0, 0, 0), new Point(-20, 30, 0), new Point(30, 30, 0), new Vector(0,0,0), new Vector(0,0,0), new Vector(0,0,0));

//const poligons: Triangle[] = reader.readFile();
//console.log(poligons.length);

// const matrix: Matrix4x4 = new Matrix4x4();
// matrix.move(100, -150,0);
// matrix.rotateX(55);
// matrix.scale(60,60,60);

// triangle.transform(matrix);

// for (let t = 0; t < poligons.length; t++) {
//     poligons[t].transform(matrix);
//     scene.addObject(poligons[t]);
// }


scene.addObject(triangle1);
//scene.addObject(triangle2);
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