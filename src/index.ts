import Normal from "./components/Normal";
import Point from "./components/Point";
import Sphere from "./components/objects/Sphere";
import Screen from "./components/Screen";
import Camera from "./components/Camera";
import DirectedLight from "./components/DirectedLight";
import Scene from "./components/Scene";
import Plane from "./components/objects/Plane";

const screen: Screen = new Screen(20, 20, new Point(0, 0, 30));
const camera: Camera = new Camera(new Point(0, 0, 50));
const light: DirectedLight = new DirectedLight(Normal.create(1, 1, 1));
const scene: Scene = new Scene(camera, screen, light);

const sphere: Sphere = new Sphere(new Point(-10, 0, 0), 15);
const plane: Plane = new Plane(new Point(0, 0, 0), Normal.create(1, 1, 1));
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