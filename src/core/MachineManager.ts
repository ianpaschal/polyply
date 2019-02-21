import Machine from "./Machine";

class MachineManager {
	_machines: Machine[];
	_activeMachine: Machine;

	set activeMachine( machine: Machine ) {
		// Set the active machine to the given Machine instance
		this._activeMachine = machine;
		// If that machine hasn't been registered yet, make sure it is
		this.addMachine( machine );
	}

	get activeMachineIndex() {
		return this._machines.indexOf( this._activeMachine );
	}

	addMachine( machine: Machine ) {
		if ( this._machines.indexOf( machine ) === -1 ) {
			this._machines.push( machine );
		}
	}

	init() {
		// Do nothing for now
	}
}

export default MachineManager;
