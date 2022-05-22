import Normal from "./components/Normal";
import Point from "./components/Point";
import Sphere from "./components/objects/Sphere";
import Screen from "./components/Screen";
import Camera from "./components/Camera";
import DirectedLight from "./components/DirectedLight";
import Scene from "./components/Scene";
//import Plane from "./components/objects/Plane";

const sphere1: Sphere = new Sphere(new Point(25, 0, -10), 20);
const sphere2: Sphere = new Sphere(new Point(-10, 0, 5), 20);
const sphere3: Sphere = new Sphere(new Point(-45, 5, 0), 15);
const sphere4: Sphere = new Sphere(new Point(35, -10, 10), 10);
//const plane: Plane = new Plane(new Point(0,5,0),Normal.create(0,1,-1))
const screen: Screen = new Screen(50, 20, new Point(0, 0, 30));
const camera: Camera = new Camera(new Point(0, 0, 40));
const light: DirectedLight = new DirectedLight(Normal.create(1, 1, 1));
const scene: Scene = new Scene(camera, screen, light);

scene.addObject(sphere1);
scene.addObject(sphere2);
scene.addObject(sphere3);
scene.addObject(sphere4);
//scene.addObject(plane);
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