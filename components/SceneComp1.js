import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

import { Mesh } from "@babylonjs/core/Meshes/mesh";
// for basic shapes
import "@babylonjs/core/Meshes/meshBuilder";
import '@babylonjs/core/Materials/standardMaterial';

import SceneTemplate from '../SceneTemplate';

class SceneComp1 extends React.Component {
  onInitScene = async (scene) => {
    // This creates and positions a arcRotate camera
    const camera = new ArcRotateCamera("ArcRotateCamera", 2, 1.45, 10, new Vector3(0, 0, 0), scene);
    camera.upperBetaLimit = Math.PI / 2;
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 25;
    
    // This attaches the camera to the canvas
    // camera.attachControl(canvas, true);
    
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Create a grid material
    var material = new GridMaterial("grid", scene);

    // Our built-in 'box' shape. Params: name, size, scene
    var box = Mesh.CreateBox("box", 2, scene);

    // Affect a material
    box.material = material;

    scene.registerBeforeRender(() => {
      box.rotation.y += 0.01;
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>{ this.props.name }</Text>
        <SceneTemplate onInitScene={ this.onInitScene }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    padding: 15
  }
});  

export default SceneComp1;