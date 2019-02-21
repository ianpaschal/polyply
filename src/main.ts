import { app, BrowserWindow } from "electron";
import * as Path from "path";
import * as URL from "url";
// import HardwareItem from "./core/HardwareItem";
// import Machine from "./core/Machine";
import MachineManager from "./core/MachineManager";
// import PrintableItem from "./core/PrintableItem";
// import SettingItem from "./core/SettingItem";
// import SettingsLayer from "./core/SettingsLayer";

const startUrl = URL.format({
	pathname: Path.join( __dirname, "../dist/renderer.html" ),
	protocol: "file:",
	slashes: true
});

// To avoid being garbage collected
let mainWindow: BrowserWindow|null;
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
