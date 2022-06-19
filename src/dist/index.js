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
var Triangle_1 = require("./components/objects/Triangle");
var FileOutput_1 = require("./utils/FileOutput");
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
var screen = new Screen_1.default(200, 200, new Point_1.default(0, 0, 200));
var camera = new Camera_1.default(new Point_1.default(0, 0, 350));
var light = new DirectedLight_1.default(Normal_1.default.create(1, 1, 1));
var out = new FileOutput_1.default(screen.width, screen.height, output_file);
//const out: IOutput = new ConsoleOutput(screen.width, screen.height);
var scene = new Scene_1.default(camera, screen, light, out);
var sphere = new Sphere_1.default(new Point_1.default(0, 0, 0), 150);
var plane = new Plane_1.default(new Point_1.default(0, 0, 0), Normal_1.default.create(1, 1, 1));
var triangle = new Triangle_1.default(new Point_1.default(-10, 0, 25), new Point_1.default(30, 5, 35), new Point_1.default(0, 40, 30));
scene.addObject(sphere);
//scene.addObject(plane);
//scene.addObject(triangle);
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
