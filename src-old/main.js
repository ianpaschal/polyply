const { app, BrowserWindow } = require("electron" );
const path = require( "path" );
const url = require("url" );
const { fork } = require("child_process");
const { ipcMain } = require("electron");
const Three = require("three");

// require("electron-reload" )( app.getAppPath() );

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let windows = {};

function createMainWindow () {

	// Create the browser window.
	windows.main = new BrowserWindow({
		width: 800,
		height: 600,
		titleBarStyle: "hidden"
	});

	// and load the index.html of the app.
	windows.main.loadURL( url.format({
		pathname: path.join( app.getAppPath(), "src/windows/rendering.html" ),
		protocol: "file:",
		slashes: true
	}) );

	// Open the DevTools.
	windows.main.webContents.openDevTools();

	// Emitted when the window is closed.
	windows.main.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		delete windows.main;
	});
}

// Create window when app is ready:
app.on("ready", () => {
	BrowserWindow.addDevToolsExtension(
		"/Users/Ian/Library/Application\ Support/Google/Chrome/Default/Extensions/" +
		"nhdogjmejiglipccpnnnanhbledajbpd/3.1.6_0"
	);
	createMainWindow();
});

// Quit when all windows are closed:
app.on("window-all-closed", () => {
	app.quit();
});

// Re-create window if somehow it went missing:
app.on("activate", () => {
	if ( windows.play === null ) {
		createMainWindow();
	}
});
