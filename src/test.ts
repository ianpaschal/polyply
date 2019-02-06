/*

There is only one stack. It is resolved in a reduxy way.

1. Machine settings
2. Global settings, which override machine defaults
3. Extruder settings, per extrruder, which override global settings
2. Object settings, per object, which override extruder settings

"setting" = adjustable
"property" = physical property, constant

At each level, there are settings which can be overridden or not.

*/

const sceneObjects = [];

function resolveSettings() {
    /**
     * This ultimately resolves an array of per object settings
     */
}

class Machine {

    _props: {};
    _nozzles: any;

    constructor() {
        this._props = {};
        this._nozzles = [];
    }
    /**
     * @description Add a hardware component to the machine. This sets values in the machine's
     * properties, which are immutable
     * @param properties 
     */
    addHardware( type, properties ) {

        if (type === "nozzle") {

        }
    }

    get props() {
        return this._props
    }

    set settingsLayer( layer:SettingsLayer ) {

    }

    get settingsGraph() {

    }

    get flattenedSettingsGraph() {
        return {}
    }
}

class HardwareItem {

    constructor( id:string, properties:{} ) {

    }
}

class SettingItem {

    _key: string;
    _value: any;
    _canOverride: boolean;

    constructor(key:string, value:any, canOverride:boolean = true) {
        this._key = key;
        this._value = value;
        this._canOverride = canOverride;
    }
}

class SettingsLayer {

    _hardware: [];
    _settings: [];

    constructor( parent:SettingsLayer|null, settings:SettingItem[] ) {
        this._hardware = [];
        this._settings = [];
    }

    addSettings(settingObject) {

    }

    /**
     * 
     * @param hardwareItem array or single item
     */
    addHardware(hardwareItem) {

    }
}

class PrintObject {

}

class SupportObject {
    
}



const exampleGlobalProfile = new SettingsLayer(null, [
    new SettingItem("layer-height", 0.1)
]);
