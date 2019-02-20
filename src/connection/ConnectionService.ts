interface Device {

}

class ConnectionService {

	_onFindDevices?: Function;

	set onFindDevices( fn: Function ) {
		this._onFindDevices = fn;
	}

	findDevices(): Device[] {
		const container = [];
		if ( this._onFindDevices ) {
			this._onFindDevices( container );
		}
		return container;
	}
}

export default ConnectionService;
