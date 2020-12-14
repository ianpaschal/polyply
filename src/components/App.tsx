import React from "react";
import "./App.css";
import SettingsGrid from "./config/SettingsGrid";
import { ipcRenderer } from "electron";
import { connect } from "react-redux";

interface AppProps {
	addImages: Function;
	remoteMachines: any[];
}

class App extends React.Component<AppProps> {

	state: any = { remoteMachines: [], activeMachine: null, settings: {} };

	constructor( props ) {
		super( props );

		this._getPrinterList = this._getPrinterList.bind( this );

		ipcRenderer.on( "REMOTE_MACHINES", ( e:any, data:any ) => {
			this.setState({
				remoteMachines: data
			});
		});
		ipcRenderer.on( "ACTIVE_MACHINE", ( e:any, data:any ) => {
			this.setState({
				activeMachine: data.name,
				settings: data.settings
			});
			console.log( "Set active machine to", data );
		});
	}

	_getPrinterList() {
		ipcRenderer.send( "GET_REMOTE_MACHINES", {});
	}

	_connectToMachine( serviceName:string ) {
		ipcRenderer.send( "CONNECT_TO_MACHINE_BY_LAN", {
			serviceName: serviceName
		});

	}

	// Apply changes in app state which were passed via props to component state
	componentDidUpdate( prevProps:AppProps ) {
		if ( this.props.remoteMachines != prevProps.remoteMachines ) {
			this.setState({
				printers: this.props.remoteMachines
			});
		}
	}

	render() {
		if ( !this.state.activeMachine ) {
			return (
				<div id="emptyState">
					<button onClick={this._getPrinterList}>Printers</button>
					<ul>
						{this.state.remoteMachines.map( ( item, i ) => (
							<li key={i}>
								<button onClick={() => this._connectToMachine( item.id )}>
									{item.name}
								</button>
							</li>
						) )}
					</ul>
				</div>
			);
		} else {
			return (
				<div id="app">

					<div id="config-pane">
						<div id="machine-section" className="config-section">
							<h1>{this.state.activeMachine}</h1>
						</div>
						<div id="hardware-section" className="config-section">
							<h2>{"Hardware"}</h2>
						</div>
						<div id="settings-section" className="config-section">
							<h2>{"Settings"}</h2>
							<SettingsGrid settings={this.state.settings}/>
						</div>
					</div>
					<div id="arrange-pane">

					</div>
				</div>
			);
		}
	}
}

const mapDispatchToProps = function( dispatch:any ) {
	return {};
};

export default connect( null, mapDispatchToProps )( App );
