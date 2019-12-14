import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import AssetUtils from 'expo-asset-utils';
// import { readAsStringAsync } from 'expo-file-system';
import { Asset } from 'react-native-unimodules';

import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';

import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { GLTFLoader } from '@babylonjs/loaders/glTF/2.0/glTFLoader';

// for compressed glb files
import '@babylonjs/loaders/glTF/2.0/Extensions/KHR_draco_mesh_compression';

import SceneTemplate from '../SceneTemplate';

class SceneComp3 extends React.Component {
    onInitScene = async (scene) => {
        var CustomParseLoader = (loader) => {
            loader.onParsedObservable.add(data => {
                // alert('CustomParseLoader ')
                // alert('1CustomParseLoader ' + JSON.stringify(data.json))
            });
        }

        var CustomMaterialLoader = function (loader) {
            this.name = "CustomMaterialLoader";
            this.enabled = true;
            //alert('CustomMaterialLoader '+ JSON.stringify(loader));

            this.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
                var promises = [];
                var pbrMetallicRoughness = material.pbrMetallicRoughness;
                alert(JSON.stringify(material))
                if (pbrMetallicRoughness) {
                    if (pbrMetallicRoughness.baseColorTexture) {
                        alert('1 ')
                        promises.push(
                            loader.loadTextureInfoAsync(
                                context + "/pbrMetallicRoughness/baseColorTexture",
                                pbrMetallicRoughness.baseColorTexture,
                                function (babylonTexture) {
                                    alert('11')
                                    // babylonMaterial.albedoTexture = Texture.LoadFromDataString("image", babylonTexture, scene);
                                    // const url = 'https://preview.smarteam3d.com/build/image2.jpg';
                                    // const asset = await AssetUtils.resolveAsync(url);
                                    babylonMaterial.albedoTexture = null //Texture.LoadFromDataString("image", babylonTexture._buffer, loader.babylonScene, true,true,true, Texture.BILINEAR_SAMPLINGMODE); // Texture.LoadFromDataString("image", babylonTexture._buffer, loader.babylonScene);
                                }
                            )
                        );
                    }
                    if (pbrMetallicRoughness.metallicRoughnessTexture) {
                        alert('2 ')
                        promises.push(
                            loader.loadTextureInfoAsync(
                                context + "/pbrMetallicRoughness/metallicRoughnessTexture",
                                pbrMetallicRoughness.metallicRoughnessTexture,
                                function (babylonTexture) {
                                    alert('21')
                                    // babylonMaterial.albedoTexture = Texture.LoadFromDataString("image", babylonTexture, scene);
                                    // const url = 'https://preview.smarteam3d.com/build/image2.jpg';
                                    // const asset = await AssetUtils.resolveAsync(url);
                                    babylonMaterial.metallicTexture = null //Texture.LoadFromDataString("image", asset, loader.babylonScene);
                                }
                            )
                        );
                    }
                }
                if (material.occlusionTexture) {
                    alert('3 ')
                    promises.push(
                        loader.loadTextureInfoAsync(
                            context + "/material/occlusionTexture",
                            material.occlusionTexture,
                            function (babylonTexture) {
                                // babylonMaterial.albedoTexture = Texture.LoadFromDataString("image", babylonTexture, scene);
                                // const url = 'https://preview.smarteam3d.com/build/image2.jpg';
                                // const asset = await AssetUtils.resolveAsync(url);
                                babylonMaterial.ambientTexture = null //Texture.LoadFromDataString("image", babylonTexture._buffer, loader.babylonScene, true,true,true, Texture.BILINEAR_SAMPLINGMODE); // Texture.LoadFromDataString("image", babylonTexture._buffer, loader.babylonScene);
                            }
                        )
                    );
                }
                if (material.normalTexture) {
                    alert('4 ')
                    promises.push(
                        loader.loadTextureInfoAsync(
                            context + "/material/normalTexture",
                            material.normalTexture,
                            function (babylonTexture) {
                                // babylonMaterial.albedoTexture = Texture.LoadFromDataString("image", babylonTexture, scene);
                                // const url = 'https://preview.smarteam3d.com/build/image2.jpg';
                                // const asset = await AssetUtils.resolveAsync(url);
                                babylonMaterial.bumpTexture = null //Texture.LoadFromDataString("image", babylonTexture._buffer, loader.babylonScene, true,true,true, Texture.BILINEAR_SAMPLINGMODE); // Texture.LoadFromDataString("image", babylonTexture._buffer, loader.babylonScene);
                            }
                        )
                    );
                }
                if (material.emissiveTexture) {
                    alert('5 ')
                    promises.push(
                        loader.loadTextureInfoAsync(
                            context + "/material/emissiveTexture",
                            material.emissiveTexture,
                            function (babylonTexture) {
                                // babylonMaterial.albedoTexture = Texture.LoadFromDataString("image", babylonTexture, scene);
                                // const url = 'https://preview.smarteam3d.com/build/image2.jpg';
                                // const asset = await AssetUtils.resolveAsync(url);
                                babylonMaterial.emissiveTexture = null //Texture.LoadFromDataString("image", babylonTexture._buffer, loader.babylonScene, true,true,true, Texture.BILINEAR_SAMPLINGMODE); // Texture.LoadFromDataString("image", babylonTexture._buffer, loader.babylonScene);
                            }
                        )
                    );
                }
                return Promise.all(promises);
            }
        }

        // GLTFLoader.RegisterExtension("CustomMaterialLoader", function (loader) { return new CustomMaterialLoader(loader); });
        // SceneLoader.OnPlugnActivatedObservable.addOnce(function (loader) { return new CustomParseLoader(loader); });
        // SceneLoader.CleanBoneMatrixWeights = true;

        // This creates and positions an arcRotate camera
        const camera = new ArcRotateCamera("ArcRotateCamera", 2, 1.45, 5, new Vector3(0, 0, 0), scene);
        camera.upperBetaLimit = Math.PI / 2;
        camera.lowerRadiusLimit = 1;
        camera.upperRadiusLimit = 25;
        
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7; 

        // Add the environment manually, instead of createDefaultEnvironment function
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

        const ms = (await SceneLoader.ImportMeshAsync("", "https://www.babylonjs-playground.com/scenes/BrainStem/", "BrainStem.gltf", scene, null, ".gltf")).meshes;
        // const ms = (await SceneLoader.ImportMeshAsync('', "https://www.babylonjs-playground.com/scenes/BrainStem/", "BrainStem.gltf", scene, null, '.gltf')).meshes;
        // const ms = (await SceneLoader.ImportMeshAsync('', "https://models.babylonjs.com/shaderBall/", "BabylonShaderBall_Simple.gltf", scene, null, '.gltf')).meshes;
        // const ms = (await SceneLoader.ImportMeshAsync('', "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF/", "BoxTextured.gltf", scene, null, '.gltf')).meshes;
        // alert(ms);
        ms[0].position.y = -0.5;

        // Load glb/gltf from local folder
        // const glb = Asset.fromModule(require('./assets/character.glb'));
        // await glb.downloadAsync();
        // alert(JSON.stringify(glb))
        // const asset2 = await AssetUtils.resolveAsync(glb.localUri);
        // alert(JSON.stringify(asset2))
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

export default SceneComp3;