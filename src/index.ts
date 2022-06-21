import Normal from "./components/Normal";
import Point from "./components/Point";
import Sphere from "./components/objects/Sphere";
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
import FilesService from "./utils/FilesService";

/* get files paths */
const DEFAULT_FILES_PATH: string = 'C:\\Users\\bodya\\Desktop\\Graphics\\CompGraph\\assets\\';
const filesService = new FilesService(DEFAULT_FILES_PATH);
const [input_file, output_file] = filesService.getFiles();

/* set main constants */
const WIDTH: number = 1000;
const HEIGHT: number = 1000;

const SCREEN_OFFSET: number = 2000;
const CAMERA_POS: number = WIDTH + SCREEN_OFFSET;

/* create main components */
const camera: Camera = new Camera(new Point(0, 0, CAMERA_POS), WIDTH, HEIGHT);
const light: DirectedLight = new DirectedLight(Normal.create(1, 1, 1));
const out: IOutput = new FileOutput(camera.width, camera.height, output_file);
//const out: IOutput = new ConsoleOutput(camera.width, camera.height);
const scene: Scene = new Scene(camera, light, out);

/* create objects */
const sphere: Sphere = new Sphere(new Point(0,0,0), 450);
const plane: Plane = new Plane(new Point(WIDTH,0,0), Normal.create(1,0,0));
const triangle: Triangle = new Triangle(new Point(-40, 0, 15), new Point(30, -25, 65), new Point(0, 50, 30), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0));

scene.addObject(sphere);
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