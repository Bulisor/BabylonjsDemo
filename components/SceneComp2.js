import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AssetUtils from 'expo-asset-utils';
import { Asset } from 'react-native-unimodules';
// import { readAsStringAsync } from 'expo-file-system';

import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3 } from "@babylonjs/core/Maths/math.color";

import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import '@babylonjs/core/Materials/Textures/Loaders/ddsTextureLoader';

import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import "@babylonjs/core/Meshes/meshBuilder";
import '@babylonjs/core/Materials/standardMaterial';

import SceneTemplate from '../SceneTemplate';

class SceneComp2 extends React.Component {
  onInitScene = async (scene) => {
    // This creates and positions an arcRotate camera
    const camera = new ArcRotateCamera("ArcRotateCamera", 2, 1, 15, new Vector3(0, 0, 0), scene);
    camera.upperBetaLimit = Math.PI / 2;
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 25;
       
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7; 

    // Add the environment manually, instead of createDefaultEnvironment function- use Image tag
    const envTexture = CubeTexture.CreateFromPrefilteredData('https://playground.babylonjs.com/textures/environment.dds', scene);
    envTexture.name = "envTex";
    envTexture.gammaSpace = false;
    scene.environmentTexture = envTexture;

    // Add environmentBRDFTexture to avoid calling GetEnvironmentBRDFTexture internally- use Image tag
    const urlBRDF = 'https://assets.babylonjs.com/environments/correlatedMSBRDF_RGBD.png';
    const assetBRDF = await AssetUtils.resolveAsync(urlBRDF);
    const envBRDFTexture = Texture.LoadFromDataString("image", assetBRDF, scene, true,true,true, Texture.BILINEAR_SAMPLINGMODE);
    envBRDFTexture.isRGBD = true;
    scene.environmentBRDFTexture = envBRDFTexture;
   
    // Load the image from server 
    const url = 'https://playground.babylonjs.com/textures/grass.jpg';
    const asset = await AssetUtils.resolveAsync(url);
   
    // Load the image from local folder
    // const url = Asset.fromModule(require('../assets/grass.jpg'));
    // await url.downloadAsync();
    // const asset = await AssetUtils.resolveAsync(url.localUri);

    // Create the texture
    const texture = Texture.LoadFromDataString("image", asset, scene, true);
 
    // Create a pbr material
    const material = new PBRMaterial("ground", scene);
    material.albedoTexture = texture;
    material.roughness = 0.5;
    material.metallic = 0.5;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    const ground = Mesh.CreateGround("ground1", 6, 6, 1, scene);
    ground.scaling.x = 1.5;
 
    // attach the material to ground 
    ground.material = material;

    // Create a pbr material
    const material2 = new PBRMaterial("glass", scene);
    material2.indexOfRefraction = 0.52;
    material2.alpha = 0.5;
    material2.microSurface = 1;
    material2.reflectivityColor = new Color3(0.2, 0.2, 0.2);
    material2.albedoColor = new Color3(0.4, 0.4, 0.4);

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    const sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

    // attach the material to sphere
    sphere.material = material2;

    scene.registerBeforeRender(() => {
      ground.rotation.y += 0.01;
      sphere.rotation.y += 0.01;
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

export default SceneComp2;