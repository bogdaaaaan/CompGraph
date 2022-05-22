import Normal from "./components/Normal";
import Point from "./components/Point";
import Sphere from "./components/objects/Sphere";
import Screen from "./components/Screen";
import Camera from "./components/Camera";
import DirectedLight from "./components/DirectedLight";
import Scene from "./components/Scene";

const sphere: Sphere = new Sphere(new Point(0, 0, 0), 20);

const screen: Screen = new Screen(50, 20, new Point(0, 0, 30));
const camera: Camera = new Camera(new Point(0, 0, 40));
const light: DirectedLight = new DirectedLight(Normal.create(1, 1, 1));
const scene: Scene = new Scene(camera, screen, light);

scene.addObject(sphere);
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