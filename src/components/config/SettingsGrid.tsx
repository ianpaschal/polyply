import React from "react";
import "./SettingsGrid.css";
import { connect } from "react-redux";

interface SettingsGridProps {
	settings:any;
}

class SettingsGrid extends React.Component<SettingsGridProps> {

	state:any = { machine: {}, profile: {} };

	// Apply changes in app state which were passed via props to component state
	componentDidUpdate( prevProps:SettingsGridProps ) {
		if ( this.props.settings != prevProps.settings ) {
			console.log( this.props.settings );
			this.setState({
				settings: this.props.settings
			});
		}
	}

	render() {
		return (
			<div>
				<div>
					<div id="settings-headers">
						<div className="settings-column">
							<h3>Global Settings</h3>
						</div>
						<div className="settings-column">
							<h3>Extruder</h3>
						</div>
						<div className="settings-column">
							<h3>Object</h3>
						</div>
					</div>
					<div id="settings">
						{this.props.settings.map( ( item ) => (
							<div key={item.key} className="settings-item">
								<div className="settings-column">
									<label>{item.label}</label>
									<input type="text" value={item.value}/>
								</div>
								<div className="settings-column">
									{item.settablePer.extruder || item.settablePer.object ?
										<svg className="settings-connector" width="24px" height="24px" viewBox="0 0 24 24" preserveAspectRatio="none">
											<g id="Line" stroke="#3B434C">
												<path d="M0,12 L24,12"></path>
											</g>
										</svg> : null }
									{item.settablePer.extruder ?
										<input type="text"/> : null}
								</div>
								<div className="settings-column">
									{item.settablePer.object ?
										<svg className="settings-connector" width="24px" height="24px" viewBox="0 0 24 24" preserveAspectRatio="none">
											<g id="Line" stroke="#3B434C">
												<path d="M0,12 L24,12"></path>
											</g>
										</svg> : null }
									{item.settablePer.object ?
										<input type="text"/> : null}
								</div>
							</div>
						) )}
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = function( dispatch:any ) {
	return {};
};

export default connect( null, mapDispatchToProps )( SettingsGrid );
