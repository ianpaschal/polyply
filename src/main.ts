import SettingItem from "./core/SettingItem";
import Machine from "./core/Machine";
import SettingsLayer from "./core/SettingsLayer";
import HardwareItem from "./core/HardwareItem";
import PrintableItem from "./core/PrintableItem";

const defaultSettings = new SettingsLayer( [
	new SettingItem( "", 1 )
] );

const machineSettings = new SettingsLayer( [
	new SettingItem( "", 1 )
], defaultSettings );

const profileSettings = new SettingsLayer( [
	new SettingItem( "layer-height", 0.1 )
], machineSettings );

const extruder0Settings = new SettingsLayer( [
	new SettingItem( "wall-extruder", 0 ),
	new SettingItem( "support-extruder", 1 )
], profileSettings );

const extruder1Settings = new SettingsLayer( [
	new SettingItem( "wall-extruder", 0 ),
	new SettingItem( "support-extruder", 1 )
], profileSettings );

const activeMachine = new Machine();

const machines = [];
