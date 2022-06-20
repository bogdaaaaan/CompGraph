"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
var Normal_1 = require("./components/Normal");
var Point_1 = require("./components/Point");
var Sphere_1 = require("./components/objects/Sphere");
var Screen_1 = require("./components/Screen");
var Camera_1 = require("./components/Camera");
var DirectedLight_1 = require("./components/DirectedLight");
var Scene_1 = require("./components/Scene");
var Plane_1 = require("./components/objects/Plane");
var Vector_1 = require("./components/Vector");
var Triangle_1 = require("./components/objects/Triangle");
var FileOutput_1 = require("./utils/FileOutput");
var ObjectReader_1 = require("./utils/ObjectReader");
var Matrix4x4_1 = require("./components/Matrix4x4");
var input_file = "";
var output_file = "";
process_1.argv.forEach(function (val, index) {
    if (val.startsWith("--source=")) {
        input_file = val.split("=")[1];
    }
    else if (val.startsWith("--output=")) {
        output_file = val.split("=")[1];
    }
});
var WIDTH = 300;
var HEIGHT = 300;
var SCREEN_POS = 300;
var CAMERA_POS = 400;
var screen = new Screen_1.default(WIDTH, HEIGHT, new Point_1.default(0, 0, SCREEN_POS));
var camera = new Camera_1.default(new Point_1.default(0, 0, CAMERA_POS));
var light = new DirectedLight_1.default(Normal_1.default.create(1, 1, 1));
var out = new FileOutput_1.default(screen.width, screen.height, output_file);
//const out: IOutput = new ConsoleOutput(screen.width, screen.height);
var scene = new Scene_1.default(camera, screen, light, out);
var sphere = new Sphere_1.default(new Point_1.default(100, 150, 0), 50);
var plane = new Plane_1.default(new Point_1.default(0, 0, 0), Normal_1.default.create(1, 1, 1));
var triangle = new Triangle_1.default(new Point_1.default(-40, 0, 15), new Point_1.default(30, -25, 65), new Point_1.default(0, 50, 30), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0));
//scene.addObject(sphere);
//scene.addObject(plane);
//scene.addObject(triangle);
var matrix = new Matrix4x4_1.default();
matrix.scale(600, 600, 600);
matrix.rotateZ(270);
matrix.rotateX(270);
var reader = new ObjectReader_1.default(input_file);
var poligons = reader.readFile();
console.log(poligons.length);
for (var i = 0; i < poligons.length; i++) {
    poligons[i].transform(matrix);
    scene.addObject(poligons[i]);
}
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
