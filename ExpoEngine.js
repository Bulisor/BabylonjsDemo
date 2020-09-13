import { Engine } from "@babylonjs/core/Engines/engine";

class ExpoEngine extends Engine {
    getHostDocument() {
        return null;
    }
}

export default ExpoEngine;