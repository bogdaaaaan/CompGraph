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
const WIDTH: number = 768;
const HEIGHT: number = 768;

const SCREEN_OFFSET: number = 800;
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
const triangle: Triangle = new Triangle(new Point(0, 0, 0), new Point(1, 1, 0), new Point(1, 0, 0), new Vector(0, 0, -1), new Vector(0, 0, -1), new Vector(0, 0, -1));

/* read file */
const objectReader: ObjectReader = new ObjectReader(input_file);
const lists: any[] = objectReader.readObject();

/* transformation matrix */
const matrix: Matrix4x4 = new Matrix4x4();

/* operations in order of transition, rotation and scale */
//matrix.move(-25, -25, 0);
matrix.rotate(270, 5, 310);
matrix.scale(700);

/* create poligons from transformed matrix and object data */
const poligons: Triangle[] = matrix.transformObject(lists[0], lists[1], lists[2]);
poligons.map(p => scene.addObject(p));

// triangle.transform(matrix);
// scene.addObject(triangle);

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