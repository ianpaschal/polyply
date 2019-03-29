import React from "react";
import "./App.css";
import { ipcRenderer } from "electron";
import { connect } from "react-redux";

interface AppProps {
	addImages: Function;
}

class App extends React.Component<AppProps> {

	constructor( props ) {
		super( props );

		this._getPrinterList = this._getPrinterList.bind( this );

		ipcRenderer.on( "REMOTE_MACHINES", ( e:any, data:any ) => {
			console.log( data );
		});
	}

	_getPrinterList() {
		console.log( "getting printers" );
		ipcRenderer.send( "GET_REMOTE_MACHINES", {});
	}
	render() {
		return (
			<div className="App">
				<h1>Hello world!</h1>
				<button onClick={this._getPrinterList}>Printers</button>
			</div>
		);
	}
}

const mapDispatchToProps = function( dispatch:any ) {
	return {};
};

export default connect( null, mapDispatchToProps )( App );
