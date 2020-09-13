import React from 'react';
import { GLView } from 'expo-gl';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

import ExpoEngine from "./ExpoEngine";
import { Scene } from "@babylonjs/core/scene";

import { Database } from "@babylonjs/core/Offline/database";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";

class SceneTemplate extends React.Component {
    constructor(props) {
        super(props);

        this._translateX = 0;
        this._translateY = 0;
        this._scale = 0;

        this.updatePan = false;
        this.updatePinch = false;
    }

    _onPanGestureEvent = e => {
        this._translateX = e.nativeEvent.velocityX;
        this._translateY = e.nativeEvent.velocityY;
    }

    _onHandlePanStateChange = e => {
        switch (e.nativeEvent.state) {
            case State.ACTIVE:
            case State.BEGAN:
                this.updatePan = true;
                break;
            case State.END:
            case State.CANCELLED:
            case State.FAILED:
                this.updatePan = false;
                break;
            default:
                break;
        }
    }

    _onPinchGestureEvent = e => {
        this._scale = e.nativeEvent.velocity;
    }

    _onHandlePinchStateChange = e => {
        switch (e.nativeEvent.state) {
            case State.ACTIVE:
            case State.BEGAN:
                this.updatePinch = true;
                break;
            case State.END:
            case State.CANCELLED:
            case State.FAILED:
                this.updatePinch = false;
                break;
            default:
                break;
        }
    }

    componentDidMount () {};

    componentWillUnmount () {};

    componentWillMount() {};

    _onGLContextCreate = async gl => {
        // Get the gl context and associate a Babylon Engine to it.
        const engine = new ExpoEngine(gl, true, {}, false);
        
        // Disable LoadingScreen and IDBStorage
        SceneLoader.ShowLoadingScreen = false;
        SceneLoader.CleanBoneMatrixWeights = true;
        Database.IDBStorageEnabled = false;

        // Create our first scene
        const scene = new Scene(engine);

        // inject more functions
        this.props.onInitScene(scene);

        scene.registerBeforeRender(() => {
            if (this.updatePan) {
                scene.activeCamera.alpha -= this._translateX / 6000;
                scene.activeCamera.beta -= this._translateY / 6000;
            }
            if (this.updatePinch) {
                scene.activeCamera.radius -= this._scale * 60;
            }

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
            <PanGestureHandler
                minPointers = { 1 }
                maxPointers = { 2 }
                onGestureEvent={ this._onPanGestureEvent }
                onHandlerStateChange={ this._onHandlePanStateChange }>
                   <PinchGestureHandler
                        onGestureEvent={ this._onPinchGestureEvent }
                        onHandlerStateChange={ this._onHandlePinchStateChange }>
                        <GLView
                            style={ styles.container }
                            onContextCreate={ this._onGLContextCreate }
                        />
                    </PinchGestureHandler> 
            </PanGestureHandler>
        );
    }
}

const styles = StyleSheet.create({  
    container: {  
      flex: 1,   
      width: 300, 
      height: 300
    }
});  

export default SceneTemplate;