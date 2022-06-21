"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Normal_1 = require("./components/Normal");
var Point_1 = require("./components/Point");
var Sphere_1 = require("./components/objects/Sphere");
var Camera_1 = require("./components/Camera");
var DirectedLight_1 = require("./components/DirectedLight");
var Scene_1 = require("./components/Scene");
var Plane_1 = require("./components/objects/Plane");
var Vector_1 = require("./components/Vector");
var Triangle_1 = require("./components/objects/Triangle");
var FileOutput_1 = require("./utils/FileOutput");
var ObjectReader_1 = require("./utils/ObjectReader");
var Matrix4x4_1 = require("./components/Matrix4x4");
var FilesService_1 = require("./utils/FilesService");
/* get files paths */
var DEFAULT_FILES_PATH = 'C:\\Users\\bodya\\Desktop\\Graphics\\CompGraph\\assets\\';
var filesService = new FilesService_1.default(DEFAULT_FILES_PATH);
var _a = filesService.getFiles(), input_file = _a[0], output_file = _a[1];
/* set main constants */
var WIDTH = 768;
var HEIGHT = 768;
var SCREEN_OFFSET = 800;
var CAMERA_POS = WIDTH + SCREEN_OFFSET;
/* create main components */
var camera = new Camera_1.default(new Point_1.default(0, 0, CAMERA_POS), WIDTH, HEIGHT);
var light = new DirectedLight_1.default(Normal_1.default.create(1, 1, 1));
var out = new FileOutput_1.default(camera.width, camera.height, output_file);
//const out: IOutput = new ConsoleOutput(camera.width, camera.height);
var scene = new Scene_1.default(camera, light, out);
/* create objects */
var sphere = new Sphere_1.default(new Point_1.default(0, 0, 0), 450);
var plane = new Plane_1.default(new Point_1.default(WIDTH, 0, 0), Normal_1.default.create(1, 0, 0));
var triangle = new Triangle_1.default(new Point_1.default(0, 0, 0), new Point_1.default(1, 1, 0), new Point_1.default(1, 0, 0), new Vector_1.default(0, 0, -1), new Vector_1.default(0, 0, -1), new Vector_1.default(0, 0, -1));
/* read file */
var objectReader = new ObjectReader_1.default(input_file);
var lists = objectReader.readObject();
/* transformation matrix */
var matrix = new Matrix4x4_1.default();
/* operations in order of transition, rotation and scale */
//matrix.move(-25, -25, 0);
matrix.rotate(270, 5, 310);
matrix.scale(700);
/* create poligons from transformed matrix and object data */
var poligons = matrix.transformObject(lists[0], lists[1], lists[2]);
poligons.map(function (p) { return scene.addObject(p); });
// triangle.transform(matrix);
// scene.addObject(triangle);
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
