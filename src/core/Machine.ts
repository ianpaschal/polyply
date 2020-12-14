import SettingsLayer from "./SettingsLayer";
import SettingsItem from "./SettingsItem";

export default class Machine {

	_props:any = {};

	_name:string;
	_firmwareVersion:string = "0.0.0"
	_hardwareConfigurations:any[] = [];
	_settingsGraph:any = {};
	settings:SettingsItem[];

	/**
	 * @description Add a hardware component to the machine. This sets values in the machine's
	 * properties, which are immutable
	 * @param properties
	 */
	addHardware( type:any, properties:any ) {

		if ( type === "nozzle" ) {

		}
	}

	get props() {
		return this._props;
	}

	addExtruderSettings( index:number, settings:SettingsLayer ) {

	}

	get settingsGraph() {
		return this._settingsGraph;
	}
	set settingsGraph( SettingsLayer ) {

	}

	get flattenedSettingsGraph() {
		return {};
	}

	get name() {
		return this._name;
	}

	set name( value ) {
		this._name = value;
	}

	get firmwareVersion() {
		return this._firmwareVersion;
	}

	set firmwareVersion( value ) {
		this._firmwareVersion = value;
	}

	addHardwareConfiguration( config:any ) {
		if ( this._hardwareConfigurations.indexOf( config ) === -1 ) {
			this._hardwareConfigurations.push( config );
		}
	}

	addConnectionType( config:any ) {

	}

	applySettingsGraph( graph:any ) {
		this._settingsGraph = graph;
	}

	addSettingLayers( layerIndex:number, ) {

	}
}
