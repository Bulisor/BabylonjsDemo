import React from 'react';
import { GLView } from 'expo-gl';
import { Text, View } from 'react-native';

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Materials/standardMaterial";

// import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
// import "@babylonjs/loaders/glTF/2.0";

class SceneComp extends React.Component {
    componentDidMount () {};

    componentWillUnmount () {};

    _onGLContextCreate = async gl => {
        // Get the gl context and associate a Babylon Engine to it.
        const engine = new Engine(gl, true);

        // Create our first scene.
        const scene = new Scene(engine);

        // This creates and positions a free camera (non-mesh)
        const camera = new ArcRotateCamera("ArcRotateCamera", 2, 1.45, 10, new Vector3(0, 0, 0), scene);

        // We cann't attach camera to canvas becaus in this case we do not have canvas
        // camera.attachControl(canvas, true);
        
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Create a grid material
        const material = new GridMaterial("grid", scene);

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        const sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 2;

        // Affect a material
        // sphere.material = material;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        const ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

        // Affect a material
        ground.material = material;

        //TODO: import gltf/glb model
        // await SceneLoader.ImportMeshAsync("", "https://models.babylonjs.com/", "seagulf.glb", scene, null, '.glb');
        
        scene.registerBeforeRender(() => {
            ground.rotation.y += 0.01

            gl.endFrameEXP(); 
        });

        engine.runRenderLoop(() => {
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