"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Normal_1 = require("./components/Normal");
var Point_1 = require("./components/Point");
var Sphere_1 = require("./components/objects/Sphere");
var Camera_1 = require("./components/Camera");
var DirectedLight_1 = require("./components/DirectedLight");
var Scene_1 = require("./components/Scene");
var Vector_1 = require("./components/Vector");
var Triangle_1 = require("./components/objects/Triangle");
var FileOutput_1 = require("./utils/FileOutput");
var FilesService_1 = require("./utils/FilesService");
/* get files paths */
var DEFAULT_FILES_PATH = 'C:\\Users\\bodya\\Desktop\\Graphics\\CompGraph\\assets\\';
var filesService = new FilesService_1.default(DEFAULT_FILES_PATH);
var _a = filesService.getFiles(), input_file = _a[0], output_file = _a[1];
/* set main constants */
var WIDTH = 680;
var HEIGHT = 480;
var SCREEN_OFFSET = 800;
var CAMERA_POS = WIDTH + SCREEN_OFFSET;
/* create main components */
var camera = new Camera_1.default(new Point_1.default(0, 0, CAMERA_POS), WIDTH, HEIGHT);
var light = new DirectedLight_1.default(Normal_1.default.create(-0.3, 0, 1));
var out = new FileOutput_1.default(camera.width, camera.height, output_file);
//const out: IOutput = new ConsoleOutput(camera.width, camera.height);
var scene = new Scene_1.default(camera, light, out);
/* create objects */
var sphere = new Sphere_1.default(new Point_1.default(180, 0, -700), 350);
var closer_sphere = new Sphere_1.default(new Point_1.default(-180, 0, -160), 100);
var closest_triangle = new Triangle_1.default(new Point_1.default(-300, -30, 100), new Point_1.default(-100, -10, 480), new Point_1.default(-200, 120, 280), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0));
/* read file */
// const objectReader: ObjectReader = new ObjectReader(input_file);
// const lists: any[] = objectReader.readObject();
// /* transformation matrix */
// const matrix: Matrix4x4 = new Matrix4x4();
// /* operations in order of transition, rotation and scale */
// //matrix.move(-80, -80, 0);
// matrix.rotate(270, 0, 310);
// //matrix.rotate(5, 5, 0);
// matrix.scale(700);
// /* create poligons from transformed matrix and object data */
// const poligons: Triangle[] = matrix.transformObject(lists[0], lists[1], lists[2]);
// poligons.map(p => scene.addObject(p));
scene.addObject(sphere);
scene.addObject(closer_sphere);
scene.addObject(closest_triangle);
var start = performance.now();
scene.render();
var end = performance.now();
console.log("Time elapsed: ".concat(Math.round((end - start) / 1000), "s"));
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
