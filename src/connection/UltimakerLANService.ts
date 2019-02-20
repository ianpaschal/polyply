const bonjour = require( "bonjour" )();

import Machine from "../core/Machine"; // Typing

class UltimakerLANService {

	_browser: any;
	_availableDevices: any[];

	constructor() {
		this._browser = bonjour.find({
			type: "ultimaker"
		}, this._onDiscoveredService );
	}

	init() {
		this._browser.start();
	}

	_onDiscoveredService( service ) {
		console.log( "Found a printer:", service.txt );
		/* Example zeroconf result (service.txt):
			{
				hotend_serial_1: '5eb8ff220000',
				type: 'printer',
				firmware_version: 'MOD-5.1.7.20181023',
				hotend_serial_0: '8b5386230000',
				machine: '9051.0',
				hotend_type_0: 'AA 0.25',
				cluster_size: '1',
				name: 'Yian-S5-Connect',
				hotend_type_1: 'AA 0.4'
			}
		*/
		this._availableDevices.push( service.txt );
	}

	/**
	 * Link a Machine instance to a remote service by copying service data and hardware
	 * configuration data to the machine.
	 * @param machine
	 * @param serviceData
	 */
	link( machine: Machine, serviceData: any ) {
		machine.name = serviceData.name;
		machine.applyHardwareConfiguration( serviceData );
	}

	sendPrintJob() {

	}
}

export default UltimakerLANService;
