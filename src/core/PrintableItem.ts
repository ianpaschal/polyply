import SettingsLayer from "./SettingsLayer";

export default class PrintableItem {
    _settings: SettingsLayer;
    _mesh: any;
    _supportMeshes: any[];

    get settings() {
    	return this._settings;
    }

    set settings( settings:SettingsLayer ) {
    	this._settings = settings;
    }
}