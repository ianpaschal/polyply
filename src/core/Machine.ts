import SettingsLayer from "./SettingsLayer";

export default class Machine {

	_props: {};
	_nozzles: any;

	_name: string;

	constructor() {
		this._props = {};
		this._nozzles = [];
	}
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
}
