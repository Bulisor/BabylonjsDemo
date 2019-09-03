import React from 'react';
import { GLView } from 'expo-gl';
import { Text, View } from 'react-native';

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math";

import { GridMaterial } from "@babylonjs/materials/grid";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";

class SceneComp extends React.Component {
    componentDidMount () {};

    componentWillUnmount () {};

    _onGLContextCreate = async gl => {
        // Get the gl context and associate a Babylon Engine to it.
        const engine = new Engine(gl, true);

        // Create our first scene.
        const scene = new Scene(engine);

        // This creates and positions a free camera (non-mesh)
        var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
        
        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        // We cann't attach camera to canvas becaus in this case we do not have canvas
        // camera.attachControl(canvas, true);
        
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Create a grid material
        // const material = new GridMaterial("grid", scene);

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        // const sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

        // Move the sphere upward 1/2 its height
        // sphere.position.y = 2;

        // Affect a material
        // sphere.material = material;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        // const ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

        // Affect a material
        // ground.material = material;

        scene.registerBeforeRender(function () {
            // ground.rotation.y += 0.001

            gl.endFrameEXP(); 
        });

        engine.runRenderLoop(function() {
            if (scene) {
                scene.render();
            }
        });
    }

    render() {
        return (
            <View>
                <Text>BabylonJS Demo</Text>  
                <GLView
                    style={{ width: 300, height: 300 }}
                    onContextCreate={this._onGLContextCreate}
                />
            </View>
        );
    }
}

export default SceneComp;