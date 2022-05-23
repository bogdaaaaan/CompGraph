import Normal from "../src/components/Normal";
import Point from "../src/components/Point";
import Sphere from "../src/components/objects/Sphere";
import Plane from "../src/components/objects/Plane";
import Screen from "../src/components/Screen";
import Scene from "../src/components/Scene";
import Camera from "../src/components/Camera";
import DirectedLight from "../src/components/DirectedLight";

describe('testing rendering of multiple objects', () => {
    let scene: Scene;
    beforeEach (() => {
        const screen: Screen = new Screen(20, 20, new Point(0, 0, 30));
        const camera: Camera = new Camera(new Point(0, 0, 50));
        const light: DirectedLight = new DirectedLight(Normal.create(1, 1, 1));
        scene = new Scene(camera, screen, light);
    })
   
    test("One sphere renders correctly", () => {
        const sphere: Sphere = new Sphere(new Point(0, 0, 0), 20);
        
        scene.addObject(sphere);
        scene.render()

        const scene_result: string = scene.result;
        expect(scene_result).toEqual(
            "- - - - - - - - - - - - - - - - - - - - \n" +
            "- - - - - - - - 0 0 # # - - - - - - - - \n" +
            "- - - - - - 0 0 0 0 # # # # - - - - - - \n" +
            "- - - - * 0 0 0 0 0 # # # # # # - - - - \n" +
            "- - - * * 0 0 0 0 0 0 # # # # # # - - - \n" +
            "- - - * * * 0 0 0 0 0 # # # # # # - - - \n" +
            "- - . * * * 0 0 0 0 0 0 # # # # # # - - \n" +
            "- - . * * * * 0 0 0 0 0 0 # # # # # - - \n" +
            "-   . * * * * 0 0 0 0 0 0 0 # # # # # - \n" +
            "-   . . * * * * 0 0 0 0 0 0 0 0 # # # - \n" +
            "-   . . * * * * * 0 0 0 0 0 0 0 0 0 0 - \n" +
            "-     . . * * * * * 0 0 0 0 0 0 0 0 0 - \n" +
            "- -   . . * * * * * * 0 0 0 0 0 0 0 - - \n" +
            "- -     . . * * * * * * * 0 0 0 0 0 - - \n" +
            "- - -     . . * * * * * * * * 0 0 - - - \n" +
            "- - -       . . . * * * * * * * * - - - \n" +
            "- - - -       . . . . * * * * * - - - - \n" +
            "- - - - - -       . . . . . - - - - - - \n" +
            "- - - - - - - -         - - - - - - - - \n" +
            "- - - - - - - - - - - - - - - - - - - - \n"
        );
    });

    test("Two overlaping spheres rendering correctly", () => {
        const sphere: Sphere = new Sphere(new Point(-10, 0, 0), 15);
        const sphere2: Sphere = new Sphere(new Point(0, 0, 5), 15);
        
        scene.addObject(sphere);
        scene.addObject(sphere2);
        scene.render()

        const scene_result: string = scene.result;
        expect(scene_result).toEqual(
            "- - - - - - - - - - - - - - - - - - - - \n" +
            "- - - - - - - - - - - - - - - - - - - - \n" +
            "- - - - - - - - - - - - - - - - - - - - \n" +
            "- - - - - - - 0 0 0 # # # - - - - - - - \n" +
            "- - * 0 0 # 0 0 0 0 # # # # - - - - - - \n" +
            "- * 0 0 0 * 0 0 0 0 # # # # # - - - - - \n" +
            "* * 0 0 * * * 0 0 0 0 # # # # # - - - - \n" +
            "* * 0 0 * * * 0 0 0 0 0 # # # # # - - - \n" +
            "* * 0 0 . * * * 0 0 0 0 0 # # # # - - - \n" +
            "* * * 0 . * * * 0 0 0 0 0 0 # # # - - - \n" +
            ". * * * . . * * * 0 0 0 0 0 0 0 0 - - - \n" +
            ". * * *   . * * * * 0 0 0 0 0 0 0 - - - \n" +
            "  . * *   . . * * * * * 0 0 0 0 0 - - - \n" +
            "    . .     . . * * * * * * 0 0 - - - - \n" +
            "-     . .     . . . * * * * * - - - - - \n" +
            "- -       .       . . . * * - - - - - - \n" +
            "- - - - - - -             - - - - - - - \n" +
            "- - - - - - - - - - - - - - - - - - - - \n" +
            "- - - - - - - - - - - - - - - - - - - - \n" +
            "- - - - - - - - - - - - - - - - - - - - \n"
        );
    });

    test("Sphere and plane rendering correctly #1", () => {
        const sphere: Sphere = new Sphere(new Point(-10, 0, 0), 15);
        const plane: Plane = new Plane(new Point(0, 0, 0), Normal.create(1, 1, 1));
        
        scene.addObject(sphere);
        scene.addObject(plane);
        scene.render()

        const scene_result: string = scene.result;
        expect(scene_result).toEqual(
            "# # # # # # # # # # # # # # # # # # # # \n" +
            "# # # # # # # # # # # # # # # # # # # # \n" +
            "# # # # # # # # # # # # # # # # # # # # \n" +
            "# # # # # # # # # # # # # # # # # # # # \n" +
            "# # * 0 0 # # # # # # # # # # # # # # # \n" +
            "# * 0 0 0 # # # # # # # # # # # # # # # \n" +
            "# * 0 0 0 # # # # # # # # # # # # # # # \n" +
            "# * 0 0 0 0 # # # # # # # # # # # # # # \n" +
            "# * 0 0 0 0 0 # # # # # # # # # # # # # \n" +
            "# # * 0 0 0 0 0 # # # # # # # # # # # # \n" +
            "# # * * 0 0 0 0 0 0 0 0 # # # # # # # # \n" +
            "# # # * * 0 0 0 0 0 0 0 # # # # # # # # \n" +
            "# # # # * * * 0 0 0 0 # # # # # # # # # \n" +
            "# # # # # # * * * * * # # # # # # # # # \n" +
            "# # # # # # # # # # # # # # # # # # # # \n" +
            "# # # # # # # # # # # # # # # # # # # # \n" +
            "# # # # # # # # # # # # # # # # # # # # \n" +
            "# # # # # # # # # # # # # # # # # # # # \n" +
            "# # # # # # # # # # # # # # # # # # # # \n" +
            "# # # # # # # # # # # # # # # # # # # # \n"
        );
    });

    test("Sphere and plane rendering correctly #2", () => {
        const sphere: Sphere = new Sphere(new Point(-10, 0, 0), 15);
        const plane: Plane = new Plane(new Point(0, 0, 0), Normal.create(-1, -1, -1));
        
        scene.addObject(sphere);
        scene.addObject(plane);
        scene.render()

        const scene_result: string = scene.result;
        expect(scene_result).toEqual(
            "                                        \n" +
            "                                        \n" +
            "                                        \n" +
            "                                        \n" +
            "    * 0 0 # # # #                       \n" +
            "  * 0 0 0 # # # # #                     \n" +
            "  * 0 0 0 # # # # # #                   \n" +
            "  * 0 0 0 0 # # # # # #                 \n" +
            "  * 0 0 0 0 0 # # # # #                 \n" +
            "    * 0 0 0 0 0 # # # #                 \n" +
            "    * * 0 0 0 0 0 0 0 0                 \n" +
            "      * * 0 0 0 0 0 0 0                 \n" +
            "        * * * 0 0 0 0                   \n" +
            "            * * * * *                   \n" +
            "                                        \n" +
            "                                        \n" +
            "                                        \n" +
            "                                        \n" +
            "                                        \n" +
            "                                        \n"
        );
    });
});