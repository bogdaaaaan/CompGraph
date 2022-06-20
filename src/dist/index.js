"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Normal_1 = require("./components/Normal");
var Point_1 = require("./components/Point");
var Sphere_1 = require("./components/objects/Sphere");
var Screen_1 = require("./components/Screen");
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
var WIDTH = 100;
var HEIGHT = 100;
var FOV = 70;
var SCREEN_POS = 150;
/* create main components */
var screen = new Screen_1.default(new Point_1.default(0, 0, SCREEN_POS), WIDTH, HEIGHT, FOV);
var light = new DirectedLight_1.default(Normal_1.default.create(1, 1, 1));
var out = new FileOutput_1.default(screen.width, screen.height, output_file);
//const out: IOutput = new ConsoleOutput(screen.width, screen.height);
var scene = new Scene_1.default(screen, light, out);
/* create objects */
var sphere = new Sphere_1.default(new Point_1.default(0, 0, 0), 40);
var plane = new Plane_1.default(new Point_1.default(0, 0, 0), Normal_1.default.create(1, 1, 1));
var triangle = new Triangle_1.default(new Point_1.default(-40, 0, 15), new Point_1.default(30, -25, 65), new Point_1.default(0, 50, 30), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0));
scene.addObject(sphere);
//scene.addObject(plane);
//scene.addObject(triangle);
// const matrix: Matrix4x4 = new Matrix4x4();
// matrix.scale(600, 600, 600);
// matrix.rotateZ(270);
// const reader: ObjectReader = new ObjectReader(input_file);
// const poligons: Triangle[] = reader.readFile();
// console.log(poligons.length);
// for (let i = 0; i < poligons.length; i++) {
//     poligons[i].transform(matrix);
//     scene.addObject(poligons[i]);
// }
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
