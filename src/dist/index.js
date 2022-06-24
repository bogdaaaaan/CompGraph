"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Normal_1 = require("./components/Normal");
var Point_1 = require("./components/Point");
var Camera_1 = require("./components/Camera");
var DirectedLight_1 = require("./components/DirectedLight");
var Scene_1 = require("./components/Scene");
var FileOutput_1 = require("./utils/FileOutput");
var ObjectReader_1 = require("./utils/ObjectReader");
var Matrix4x4_1 = require("./components/Matrix4x4");
var FilesService_1 = require("./utils/FilesService");
var secondsFormat_1 = require("./utils/secondsFormat");
var DEFAULT_BG_COLOR = [128, 0, 255]; // magenta
var COLOR = [255, 255, 255]; //[126, 69, 52]; // brown
var DEFAULT_FILES_PATH = 'C:\\Users\\bodya\\Desktop\\Graphics\\CompGraph\\assets\\';
var WIDTH = 680;
var HEIGHT = 480;
var SCREEN_OFFSET = 1200;
var CAMERA_POS = WIDTH + SCREEN_OFFSET;
/* get files paths */
var filesService = new FilesService_1.default(DEFAULT_FILES_PATH);
var _a = filesService.getFiles(), input_file = _a[0], output_file = _a[1];
/* create main components */
var camera = new Camera_1.default(new Point_1.default(0, 0, CAMERA_POS), WIDTH, HEIGHT);
var light = new DirectedLight_1.default(Normal_1.default.create(-1, 1, 1));
var out = new FileOutput_1.default(camera.width, camera.height, output_file, COLOR, DEFAULT_BG_COLOR);
//const out: IOutput = new ConsoleOutput(camera.width, camera.height);
var scene = new Scene_1.default(camera, light, out);
/* create objects */
// const sphere: Sphere = new Sphere(new Point(180, 0, -700), 350);
// const closer_sphere: Sphere = new Sphere(new Point(-180, 0, -160), 100)
// const closest_triangle: Triangle = new Triangle(new Point(-300, -30, 100), new Point(-100, -10, 480), new Point(-200, 120, 280), new Vector(0,0,0), new Vector(0,0,0), new Vector(0,0,0));
/* read file */
var objectReader = new ObjectReader_1.default(input_file);
var lists = objectReader.readObject();
/* transformation matrix */
var matrix = new Matrix4x4_1.default();
/* operations in order of transition, rotation and scale */
matrix.move(0, -340, 0);
matrix.rotate(0, 315, 0);
matrix.scale(600);
/* create poligons from transformed matrix and object data */
var poligons = matrix.transformObject(lists[0], lists[1], lists[2]);
poligons.map(function (p) { return scene.addObject(p); });
// scene.addObject(sphere);
// scene.addObject(closer_sphere);
// scene.addObject(closest_triangle);
var start = performance.now();
scene.render();
var end = performance.now();
console.log((end - start) / 1000);
console.log("Time elapsed: ".concat((0, secondsFormat_1.convertSeconds)(Math.round((end - start) / 1000))));
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
