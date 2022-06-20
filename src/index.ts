import Normal from "./components/Normal";
import Point from "./components/Point";
import Sphere from "./components/objects/Sphere";
import Screen from "./components/Screen";
import Camera from "./components/Camera";
import DirectedLight from "./components/DirectedLight";
import Scene from "./components/Scene";
import Plane from "./components/objects/Plane";
import Triangle from "./components/objects/Triangle";

// create scene components
const screen: Screen = new Screen(20, 20, new Point(0, 0, 30));
const camera: Camera = new Camera(new Point(0, 0, 50));
const light: DirectedLight = new DirectedLight(Normal.create(1, 1, 1));
const scene: Scene = new Scene(camera, screen, light);

// create objects
const sphere: Sphere = new Sphere(new Point(0, 0, 0), 15);
const plane: Plane = new Plane(new Point(0, 0, 0), Normal.create(1, 1, 0.3));
const triangle: Triangle = new Triangle(new Point(0, 15, 15), new Point(-15, -10, 15), new Point(25, 0, 15))

scene.addObject(sphere);
scene.addObject(plane);
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