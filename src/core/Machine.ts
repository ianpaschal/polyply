import SettingsLayer from "./SettingsLayer";

export default class Machine {

	_props:any = {};
	_nozzles:any = [];

	_name:string;
	_firmwareVersion:string = "0.0.0"
	_hardwareConfigurations:any[] = [];

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
		return {};
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
}
