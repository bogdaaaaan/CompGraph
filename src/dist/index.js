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
//import ConsoleOutput from './utils/ConsoleOutput';
var FileOutput_1 = require("./utils/FileOutput");
var ObjectReader_1 = require("./utils/ObjectReader");
var Matrix4x4_1 = require("./components/Matrix4x4");
var input_file = "";
var output_file = "";
process_1.argv.forEach(function (val, index) {
    if (val.startsWith("--source=")) {
        input_file = val.split("=")[1];
    }
    else if (val.startsWith("--output")) {
        output_file = val.split("=")[1];
    }
});
var sphere = new Sphere_1.default(new Point_1.default(0, 0, 0), 50);
var sphere2 = new Sphere_1.default(new Point_1.default(4, 0, 0), 10);
var plane = new Plane_1.default(new Point_1.default(0, 0, 0), Normal_1.default.create(-1, 0, 0));
var plane2 = new Plane_1.default(new Point_1.default(9, 0, 0), Normal_1.default.create(-1, -1, -1));
var triangle = new Triangle_1.default(new Point_1.default(5, 0, 0), new Point_1.default(5, 14, 0), new Point_1.default(6, 0, 12), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0));
var triangle2 = new Triangle_1.default(new Point_1.default(6, -7, -5), new Point_1.default(6, 10, -5), new Point_1.default(9, -6, 7), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0));
var screen = new Screen_1.default(300, 300, new Point_1.default(450, 0, 0));
var camera = new Camera_1.default(new Point_1.default(550, 0, 0));
var light = new DirectedLight_1.default(Normal_1.default.create(1, 1, 1));
//const out: IOutput = new ConsoleOutput(screen.width, screen.height);
var out = new FileOutput_1.default(screen.width, screen.height, output_file);
var scene = new Scene_1.default(camera, screen, light, out);
var reader = new ObjectReader_1.default(input_file);
var poligons = reader.readFile();
console.log(poligons.length);
var matrix = new Matrix4x4_1.default();
matrix.move(100, -150, 0);
matrix.rotateX(55);
matrix.scale(600, 600, 600);
for (var t = 0; t < poligons.length; t++) {
    poligons[t].transform(matrix);
    scene.addObject(poligons[t]);
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
