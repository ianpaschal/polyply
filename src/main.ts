import { app, BrowserWindow, ipcMain } from "electron";
import * as Path from "path";
import * as URL from "url";
import BonjourService from "./interfaces/BonjourService";
import fakeConfig from "./fakeConfig";
import fakeSettings from "./fakeSettings";
import Machine from "./core/Machine";
import MachineManager from "./core/MachineManager";

const bonjour = require( "bonjour" )();

const startUrl = URL.format({
	pathname: Path.join( __dirname, "../dist/renderer.html" ),
	protocol: "file:",
	slashes: true
});

// To avoid being garbage collected
let mainWindow:BrowserWindow|null;
const machineManager = new MachineManager();

machineManager.init();

// When ready, show the main window
app.on( "ready", () => {
	mainWindow = new BrowserWindow({
		width: 1080,
		height: 640,
		backgroundColor: "#292C35"
	});
	mainWindow.loadURL( startUrl );
	mainWindow.webContents.openDevTools();

	mainWindow.on( "closed", () => {
		mainWindow = null;
	});
});

// When all windows closed, quit
app.on( "window-all-closed", () => {
	if ( process.platform !== "darwin" ) {
		app.quit();
	}
});

// Printer discovery
const availableLANPrinters:any = {};
const browser = bonjour.find({ type: "ultimaker" }, ( service:BonjourService ) => {

	// Use an object instead of array to make sure each printer is unique
	availableLANPrinters[ service.name ] = service;
});

browser.start();

// API
ipcMain.on( "GET_REMOTE_MACHINES", ( e:any, data:any ) => {
	const remoteMachines: { id:string; name:string; }[] = [];
	Object.keys( availableLANPrinters ).forEach( ( key ) => {
		remoteMachines.push({
			id: availableLANPrinters[ key ].name,
			name: availableLANPrinters[ key ].txt.name
		});
	});
	e.sender.send( "REMOTE_MACHINES", remoteMachines );
});

ipcMain.on( "ADD_MACHINE", ( e:any, data:any ) => {
	machineManager.activeMachine = new Machine();
});

ipcMain.on( "CONNECT_TO_MACHINE_BY_LAN", ( e:any, data:any ) => {
	const remoteService = availableLANPrinters[ data.serviceName ];
	if ( !remoteService ) {
		return;
	}
	const remoteData = remoteService.txt;
	const remoteConfiguration = fakeConfig;

	if ( !machineManager.activeMachine ) {
		machineManager.activeMachine = new Machine();
	}
	const machine = machineManager.activeMachine;
	machine.name = remoteData.name;
	machine.firmwareVersion = remoteData.firmware_version;
	machine.addHardwareConfiguration( remoteConfiguration );
	machine.addConnectionType({
		type: "lan",
		host: remoteService.host,
		address: remoteService.addresses[ 0 ],
		port: remoteService.port
	});

	machine.settings = fakeSettings;

	console.log( "Success!", machine.name );
	e.sender.send( "ACTIVE_MACHINE", {
		name: machine.name,
		settings: machine.settings
	});
});

ipcMain.on( "UPDATE_SETTING", ( e:any, data:any ) => {

});
