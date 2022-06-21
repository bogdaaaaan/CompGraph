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
var FilesService_1 = require("./utils/FilesService");
/* get files paths */
var DEFAULT_FILES_PATH = 'C:\\Users\\bodya\\Desktop\\Graphics\\CompGraph\\assets\\';
var filesService = new FilesService_1.default(DEFAULT_FILES_PATH);
var _a = filesService.getFiles(), input_file = _a[0], output_file = _a[1];
/* set main constants */
var WIDTH = 1000;
var HEIGHT = 1000;
var SCREEN_OFFSET = 2000;
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
var triangle = new Triangle_1.default(new Point_1.default(-40, 0, 15), new Point_1.default(30, -25, 65), new Point_1.default(0, 50, 30), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0));
scene.addObject(sphere);
// const matrix: Matrix4x4 = new Matrix4x4();
// matrix.scale(400,400,400);
// matrix.rotateY(45);
// const object_reader: ObjectReader = new ObjectReader(input_file);
// const poligons: Triangle[] = object_reader.readObject();
// poligons.map(tr => {
//   tr.transform(matrix);
//   scene.addObject(tr);
// })
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
