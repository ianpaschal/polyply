// import HardwareItem from "./core/HardwareItem";
// import PrintableItem from "./core/PrintableItem";
// import SettingItem from "./core/SettingItem";
// import SettingsLayer from "./core/SettingsLayer";
import { app, BrowserWindow, ipcMain } from "electron";
import * as Path from "path";
import * as URL from "url";
import BonjourService from "./interfaces/BonjourService";
import fakeConfig from "./fakeConfig";
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
		width: 800,
		height: 600
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
	availableLANPrinters[ service.name ] = service;
});

browser.start();

// API
ipcMain.on( "GET_REMOTE_MACHINES", ( e:any, data:any ) => {
	e.sender.send( "REMOTE_MACHINES", availableLANPrinters );
});

ipcMain.on( "ADD_MACHINE", ( e:any, data:any ) => {
	machineManager.activeMachine = new Machine();
});

ipcMain.on( "CONNECT_MACHINE_BY_LAN", ( e:any, data:any ) => {
	const machine = machineManager.activeMachine;
	const remoteService = availableLANPrinters.find( ( service:BonjourService ) => {
		return service.name === data.serviceName;
	});
	const remoteData = remoteService.txt;
	const remoteConfiguration = fakeConfig;

	machine.name = remoteData.name;
	machine.firmwareVersion = remoteData.firmware_version;
	machine.addHardwareConfiguration( remoteConfiguration );
	machine.addConnectionType({
		type: "lan",
		host: remoteService.host,
		address: remoteService.addresses[ 0 ],
		port: remoteService.port
	});
});

// const defaultSettings = new SettingsLayer( [
// 	new SettingItem( "", 1 )
// ] );

// const machineSettings = new SettingsLayer( [
// 	new SettingItem( "", 1 )
// ], defaultSettings );

// const profileSettings = new SettingsLayer( [
// 	new SettingItem( "layer-height", 0.1 )
// ], machineSettings );

// const extruder0Settings = new SettingsLayer( [
// 	new SettingItem( "wall-extruder", 0 ),
// 	new SettingItem( "support-extruder", 1 )
// ], profileSettings );

// const extruder1Settings = new SettingsLayer( [
// 	new SettingItem( "wall-extruder", 0 ),
// 	new SettingItem( "support-extruder", 1 )
// ], profileSettings );
