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
import {DEFAULT_BG_COLOR, COLOR, DEFAULT_FILES_PATH, WIDTH, HEIGHT, CAMERA_POS} from './utils/constants';

/* get files paths */
const filesService = new FilesService(DEFAULT_FILES_PATH);
const [input_file, output_file] = filesService.getFiles();

/* create main components */
const camera: Camera = new Camera(new Point(0, 0, CAMERA_POS), WIDTH, HEIGHT);
const light: DirectedLight = new DirectedLight(Normal.create(-1, 1, 1));
const out: IOutput = new FileOutput(camera.width, camera.height, output_file, COLOR, DEFAULT_BG_COLOR);
//const out: IOutput = new ConsoleOutput(camera.width, camera.height);
const scene: Scene = new Scene(camera, light, out);

/* create objects */
// const sphere: Sphere = new Sphere(new Point(180, 0, -700), 350);
// const closer_sphere: Sphere = new Sphere(new Point(-180, 0, -160), 100)
// const closest_triangle: Triangle = new Triangle(new Point(-300, -30, 100), new Point(-100, -10, 480), new Point(-200, 120, 280), new Vector(0,0,0), new Vector(0,0,0), new Vector(0,0,0));

/* read file */
const objectReader: ObjectReader = new ObjectReader(input_file);
const lists: any[] = objectReader.readObject();

/* transformation matrix */
const matrix: Matrix4x4 = new Matrix4x4();

/* operations in order of transition, rotation and scale */
//matrix.move(-80, -80, 0);
matrix.rotate(270, 0, 310);
//matrix.rotate(5, 5, 0);
matrix.scale(200);

/* create poligons from transformed matrix and object data */
const poligons: Triangle[] = matrix.transformObject(lists[0], lists[1], lists[2]);
poligons.map(p => scene.addObject(p));

// scene.addObject(sphere);
// scene.addObject(closer_sphere);
// scene.addObject(closest_triangle);

const start: number = performance.now();
scene.render();
const end: number = performance.now();
console.log(`Time elapsed: ${Math.round((end - start)/1000)}s`)

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