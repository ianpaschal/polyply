
interface Device {

}

class ConnectionService {

    _onFindDevices: Function|null = null;

    set onFindDevices( fn: Function ) {
        this._onFindDevices = fn;
    }

    findDevices(): Device[] {
        if (this._onFindDevices) {
            return this._onFindDevices();
        }
        return [];
    }
}

export default ConnectionService;