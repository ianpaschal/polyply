const fakeConfig = {
	machine: {
		brand: "Ultimaker",
		model: "9051.0"
	},
	hardwareItems: [
		{
			type: "extruder",
			data: {
				type: "AA0.4",
				position: 0,
			}
		},
		{
			type: "extruder",
			data: {
				type: "BB0.8",
				position: 1,
			}
		},
		{
			type: "buildplate",
			data: {
				type: "glass"
			}
		},
		{
			type: "material",
			data: {
				type: "PLA",
				brand: "Ultimaker",
				diameter: "2.85",
				color: "white",
				position: 0
			}
		},
		{
			type: "material",
			data: {
				type: "PVA",
				brand: "Ultimaker",
				diameter: "2.85",
				color: "natural",
				position: 1
			}
		}
	]
};

export default fakeConfig;
