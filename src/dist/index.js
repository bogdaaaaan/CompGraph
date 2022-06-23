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
var ConsoleOutput_1 = require("./utils/ConsoleOutput");
var FilesService_1 = require("./utils/FilesService");
/* get files paths */
var DEFAULT_FILES_PATH = 'C:\\Users\\bodya\\Desktop\\Graphics\\CompGraph\\assets\\';
var filesService = new FilesService_1.default(DEFAULT_FILES_PATH);
var _a = filesService.getFiles(), input_file = _a[0], output_file = _a[1];
/* set main constants */
var WIDTH = 100;
var HEIGHT = 100;
var SCREEN_OFFSET = 150;
var CAMERA_POS = WIDTH + SCREEN_OFFSET;
/* create main components */
var camera = new Camera_1.default(new Point_1.default(0, 0, CAMERA_POS), WIDTH, HEIGHT);
var light = new DirectedLight_1.default(Normal_1.default.create(-1, 0, 0.3));
//const out: IOutput = new FileOutput(camera.width, camera.height, output_file);
var out = new ConsoleOutput_1.default(camera.width, camera.height);
var scene = new Scene_1.default(camera, light, out);
/* create objects */
var sphere1 = new Sphere_1.default(new Point_1.default(20, 0, 0), 55);
var sphere2 = new Sphere_1.default(new Point_1.default(-50, 0, 55), 15);
var triangle = new Triangle_1.default(new Point_1.default(-65, -15, 20), new Point_1.default(-50, -10, 60), new Point_1.default(-57, 30, 35), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0));
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
var start = performance.now();
scene.render();
var end = performance.now();
console.log("Time elapsed: ".concat(Math.round((end - start) / 1000), "s"));
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
