import React from "react";
import "./App.css";
// import { ipcRenderer } from "electron";
import { connect } from "react-redux";

interface AppProps {
	addImages: Function;
}

class App extends React.Component<AppProps> {
	render() {
		return (
			<div className="App">
				<h1>Hello world!</h1>
			</div>
		);
	}
}

const mapDispatchToProps = function( dispatch: any ) {
	return {};
};

export default connect( null, mapDispatchToProps )( App );
