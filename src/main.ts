import SettingItem from './core/SettingItem';
import Machine from './core/Machine';
import SettingsLayer from './core/SettingsLayer';
import HardwareItem from './core/HardwareItem';
import PrintableItem from './core/PrintableItem';

/*

There is only one stack. It is resolved in a reduxy way.

0. Sensible default settings
1. Machine settings (aka a machine definition)
2. Global settings (aka a quality profile)
3. Extruder settings
2. Object settings

At each level, there are settings which can be overridden or not.

"setting" = adjustable
"property" = physical property, constant

Two heirarchies: settingslayers and settingitems

*/

const defaultSettings = new SettingsLayer([
    new SettingItem("", 1)
])

const machineSettings = new SettingsLayer([
    new SettingItem("", 1)
], defaultSettings);

const profileSettings = new SettingsLayer([
    new SettingItem("layer-height", 0.1)
], machineSettings);

const extruder0Settings = new SettingsLayer([
    new SettingItem("wall-extruder", 0),
    new SettingItem("support-extruder", 1)
], profileSettings);

const extruder1Settings = new SettingsLayer([
    new SettingItem("wall-extruder", 0),
    new SettingItem("support-extruder", 1)
], profileSettings);

const myMachine = new Machine()


const machines = [];


