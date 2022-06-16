"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
var Normal_1 = require("./components/Normal");
var Point_1 = require("./components/Point");
var Screen_1 = require("./components/Screen");
var Camera_1 = require("./components/Camera");
var DirectedLight_1 = require("./components/DirectedLight");
var Scene_1 = require("./components/Scene");
var Vector_1 = require("./components/Vector");
var Triangle_1 = require("./components/objects/Triangle");
var ConsoleOutput_1 = require("./utils/ConsoleOutput");
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
var screen = new Screen_1.default(50, 50, new Point_1.default(0, 0, 30));
var camera = new Camera_1.default(new Point_1.default(0, 0, 60));
var light = new DirectedLight_1.default(Normal_1.default.create(1, 1, 1));
var out = new ConsoleOutput_1.default(screen.width, screen.height);
//const out: IOutput = new FileOutput(screen.width, screen.height, output_file);
var scene = new Scene_1.default(camera, screen, light, out);
//const reader: ObjectReader = new ObjectReader(input_file);
var triangle1 = new Triangle_1.default(new Point_1.default(-20, 0, 0), new Point_1.default(0, 25, 0), new Point_1.default(20, 0, 0), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0), new Vector_1.default(0, 0, 0));
//const triangle2: Triangle = new Triangle(new Point(0, 0, 0), new Point(-20, 30, 0), new Point(30, 30, 0), new Vector(0,0,0), new Vector(0,0,0), new Vector(0,0,0));
//const poligons: Triangle[] = reader.readFile();
//console.log(poligons.length);
// const matrix: Matrix4x4 = new Matrix4x4();
// matrix.move(100, -150,0);
// matrix.rotateX(55);
// matrix.scale(60,60,60);
// triangle.transform(matrix);
// for (let t = 0; t < poligons.length; t++) {
//     poligons[t].transform(matrix);
//     scene.addObject(poligons[t]);
// }
scene.addObject(triangle1);
//scene.addObject(triangle2);
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
