import SettingsItem from "./core/SettingsItem";

const settings:SettingsItem[] = [];

/* TODO:
	- [ ] Categories
	- [ ] Description
	- [ ] Type
	- [ ] Max Value
	- [ ] Max Value Warning
	- [ ] Min Value
	- [ ] Min Value warning
	....functions to compute defaults, resolves, etc.

	limit_to_extruder?
	enabled?
*/

settings.push(
	new SettingsItem({
		key: "layer_height",
		label: "Layer Height",
		defaultValue: 0.1,
		unit: "mm",
		settablePerMesh: false,
		settablePerExtruder: false,
		children: [ "layer_height_0" ]
	}),
	new SettingsItem({
		key: "layer_height_0",
		label: "Initial Layer Height",
		defaultValue: 0.3,
		unit: "mm",
		settablePerMesh: false,
		settablePerExtruder: false
	}),
	new SettingsItem({
		key: "line_width",
		label: "Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: true,
		children: [
			"wall_line_width",
			"skin_line_width",
			"infill_line_width",
			"skirt_brim_line_width",
			"support_line_width",
			"support_interface_line_width",
			"prime_tower_line_width",
			"initial_layer_line_width_factor"
		]
	}),
	new SettingsItem({
		key: "wall_line_width",
		label: "Wall Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: true,
		children: [ "wall_line_width_0", "wall_line_width_x" ]
	}),
	new SettingsItem({
		key: "wall_line_width_0",
		label: "Outer Wall Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: true
	}),
	new SettingsItem({
		key: "wall_line_width_x",
		label: "Inner Wall(s) Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: true
	}),
	new SettingsItem({
		key: "skin_line_width",
		label: "Top/Bottom Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: true
	}),
	new SettingsItem({
		key: "infill_line_width",
		label: "Infill Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: true
	}),
	new SettingsItem({
		key: "skirt_brim_line_width",
		label: "Skirt/Brim Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: false,
		settablePerExtruder: true
	}),
	new SettingsItem({
		key: "support_line_width",
		label: "Support Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: false,
		settablePerExtruder: true
	}),
	new SettingsItem({
		key: "support_interface_line_width",
		label: "Support Interface Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: false,
		settablePerExtruder: true,
		children: [ "support_roof_line_width", "support_bottom_line_width" ]
	}),
	new SettingsItem({
		key: "support_roof_line_width",
		label: "Support Roof Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: false,
		settablePerExtruder: true
	}),
	new SettingsItem({
		key: "support_bottom_line_width",
		label: "Support Floor Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: false,
		settablePerExtruder: true
	}),
	new SettingsItem({
		key: "prime_tower_line_width",
		label: "Prime Tower Line Width",
		defaultValue: 0.4,
		unit: "mm",
		settablePerMesh: false,
		settablePerExtruder: true
	}),
	new SettingsItem({
		key: "initial_layer_line_width_factor",
		label: "Initial Layer Line Width",
		defaultValue: 100.0,
		unit: "%",
		settablePerMesh: false,
		settablePerExtruder: true
	})
);

export default settings;
