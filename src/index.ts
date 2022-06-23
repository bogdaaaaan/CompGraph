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
const WIDTH: number = 100;
const HEIGHT: number = 100;

const SCREEN_OFFSET: number = 150;
const CAMERA_POS: number = WIDTH + SCREEN_OFFSET;

/* create main components */
const camera: Camera = new Camera(new Point(0, 0, CAMERA_POS), WIDTH, HEIGHT);
const light: DirectedLight = new DirectedLight(Normal.create(-1, 0, 0.3));
//const out: IOutput = new FileOutput(camera.width, camera.height, output_file);
const out: IOutput = new ConsoleOutput(camera.width, camera.height);
const scene: Scene = new Scene(camera, light, out);

/* create objects */
const sphere1: Sphere = new Sphere(new Point(20,0,0), 55);
const sphere2: Sphere = new Sphere(new Point(-50,0,55), 15);

const triangle: Triangle = new Triangle(new Point(-65, -15, 20),  new Point(-50,-10, 60), new Point(-57, 30, 35), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0));

/* read file */
// const objectReader: ObjectReader = new ObjectReader(input_file);
// const lists: any[] = objectReader.readObject();

/* transformation matrix */
//const matrix: Matrix4x4 = new Matrix4x4();

/* operations in order of transition, rotation and scale */
//matrix.move(-25, -25, 0);
//matrix.rotate(270, 0, 310);
//matrix.scale(600);

/* create poligons from transformed matrix and object data */
// const poligons: Triangle[] = matrix.transformObject(lists[0], lists[1], lists[2]);
// poligons.map(p => scene.addObject(p));

//matrix.rotateY(330);
//triangle.transform(matrix);

scene.addObject(sphere1);
//scene.addObject(sphere2);
scene.addObject(triangle);

//const test: Triangle = new Triangle(new Point(-30, -10, 0),  new Point(0, 30, 0), new Point(40, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0));
//scene.addObject(test);


const start: number = performance.now();
scene.render();
const end: number = performance.now();
console.log(`Time elapsed: ${Math.round((end - start)/1000)}s`)


// import Ray from "./components/Ray";

// const ray: Ray = new Ray(new Point(0.5,0.5,70).sub(new Point(0,0,170)).toNormal(), new Point(0,0,170));
// const test: Sphere = new Sphere(new Point(0,0,0), 50);
// const test2: Sphere = new Sphere(new Point(0,0,340), 50);

// console.log(ray);
// console.log(test.intersectionWith(ray));
// console.log(test2.intersectionWith(ray));
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