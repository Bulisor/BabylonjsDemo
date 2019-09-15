import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AssetUtils from 'expo-asset-utils';
import { readAsStringAsync } from 'expo-file-system';

import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3 } from "@babylonjs/core/Maths/math.color";

import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import '@babylonjs/core/Materials/Textures/Loaders/ddsTextureLoader';

import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Meshes/meshBuilder";
import '@babylonjs/core/Materials/standardMaterial';

// for dds image
import '@babylonjs/core/Materials/Textures/Loaders/ddsTextureLoader';
import '@babylonjs/core/Helpers/sceneHelpers'
import SceneTemplate from '../SceneTemplate';

class SceneComp2 extends React.Component {
  onInitScene = async (scene) => {
    // This creates and positions a arcRotate camera
    const camera = new ArcRotateCamera("ArcRotateCamera", 2, 1.45, 10, new Vector3(0, 0, 0), scene);
    camera.upperBetaLimit = Math.PI / 2;
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 25;
       
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7; 

    // Add the environment manually, instead of createDefaultEnvironment function
    const envTexture = CubeTexture.CreateFromPrefilteredData('https://preview.smarteam3d.com/build/environment.dds', scene);
    envTexture.name = "envTex";
    envTexture.gammaSpace = false;
    scene.environmentTexture = envTexture;
    //scene.environmentBRDFTexture = envTexture;

    // Add the brdf environment texture
    // const brdfenvTextureURL = 'https://assets.babylonjs.com/environments/fullFloatEnvironmentBrdf.dds';
    // const brdfenvTextureAsset = await AssetUtils.resolveAsync(brdfenvTextureURL);
    // const brdfenvTexture = Texture.LoadFromDataString("image", brdfenvTextureAsset, scene);
    // brdfenvTexture.isRGBD = true;
    // brdfenvTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
    // brdfenvTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
    // scene.environmentBRDFTexture = brdf2;
  
    // Load the image from server 
    const url = 'https://preview.smarteam3d.com/build/image2.jpg';
    const asset = await AssetUtils.resolveAsync(url);
    // const fileContents = await readAsStringAsync(asset.uri);
    // alert(fileContents);

    // Create the texture
    const texture = Texture.LoadFromDataString("image", asset, scene);
    // const texture = new Texture("", scene, false, false, Texture.BILINEAR_SAMPLINGMODE, null, null, asset, true);
    // const texture = Texture.Parse(fileContents, scene, "");

    // Create a pbr material
    // const material = new PBRMaterial("ground", scene);
    // material.albedoTexture = texture;
    // material.environmentBRDFTexture = brdf2;
    const material = new StandardMaterial("ground", scene);
    material.diffuseTexture = texture;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    const ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);
    ground.scaling.x = 1.5;
 
    // attach the material to ground 
    ground.material = material;

    // Create a pbr material
    const material2 = new PBRMaterial("glass", scene);
    // material2.indexOfRefraction = 0.52;
    // material2.alpha = 0.6;
    // material2.microSurface = 1;
    // material2.reflectivityColor = new Color3(0.2, 0.2, 0.2);
    // material2.albedoColor = new Color3(0.85, 0.85, 0.85);
    // material2.environmentBRDFTexture = brdf2;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    const sphere = Mesh.CreateSphere("sphere1", 16, 1, scene);

    // attach the material to sphere
    sphere.material = material2;
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