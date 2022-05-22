import Normal from "./components/Normal";
import Point from "./components/Point";
import Sphere from "./components/Sphere";
import Screen from "./components/Screen";
import Camera from "./components/Camera";
import DirectedLight from "./components/DirectedLight";
import Scene from "./components/Scene";

const sphere: Sphere = new Sphere(new Point(0, 0, 0), 20);
const screen: Screen = new Screen(100, 50, new Point(10, 0, 0));
const camera: Camera = new Camera(new Point(30, 0, 0));
const light: DirectedLight = new DirectedLight(Normal.create(0.5, 1, 1));
const scene: Scene = new Scene(camera, screen, light);

scene.addObject(sphere);
scene.render();
