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
    } else if (val.startsWith("--output=")){
        output_file = val.split("=")[1];
    } 
});

const screen: Screen = new Screen(200, 200, new Point(0, 0, 200));
const camera: Camera = new Camera(new Point(0, 0, 350));
const light: DirectedLight = new DirectedLight(Normal.create(1, 1, 1));
const out: IOutput = new FileOutput(screen.width, screen.height, output_file);
//const out: IOutput = new ConsoleOutput(screen.width, screen.height);

const scene: Scene = new Scene(camera, screen, light, out);

const sphere: Sphere = new Sphere(new Point(0,0,0), 150);
const plane: Plane = new Plane(new Point(0,0,0), Normal.create(1,1,1));
const triangle: Triangle = new Triangle(new Point(-10, 0, 25), new Point(30, 5, 35), new Point(0, 40, 30));

scene.addObject(sphere);
//scene.addObject(plane);
//scene.addObject(triangle);

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