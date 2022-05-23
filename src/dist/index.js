"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Normal_1 = require("./components/Normal");
var Point_1 = require("./components/Point");
var Sphere_1 = require("./components/objects/Sphere");
var Screen_1 = require("./components/Screen");
var Camera_1 = require("./components/Camera");
var DirectedLight_1 = require("./components/DirectedLight");
var Scene_1 = require("./components/Scene");
var Plane_1 = require("./components/objects/Plane");
var screen = new Screen_1.default(20, 20, new Point_1.default(0, 0, 30));
var camera = new Camera_1.default(new Point_1.default(0, 0, 50));
var light = new DirectedLight_1.default(Normal_1.default.create(1, 1, 1));
var scene = new Scene_1.default(camera, screen, light);
var sphere = new Sphere_1.default(new Point_1.default(-10, 0, 0), 15);
var plane = new Plane_1.default(new Point_1.default(0, 0, 0), Normal_1.default.create(-1, -1, -1));
scene.addObject(sphere);
scene.addObject(plane);
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
