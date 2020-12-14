// export default class SettingsItem {
//     _canOverride : boolean;
//     _children    : SettingsItem[];
//     _defaultValue: any;
//     _description : string;
//     _enabled     : boolean;
//     _key         : string;
//     _label       : string;
//     _maximumValue: any;
//     _minimumValue: any;
//     _parent      : SettingsItem;
//     _type        : string;
//     _unit        : string;
//     _value       : any;

//     constructor( key:string, type:string, value:any, canOverride:boolean = false ) {
//     	this._key = key;
//     	this._type = type;
//     	this._value = value;
//     	this._canOverride = canOverride;
//     }
// }

interface Override {
	type:string // override type e.g. machine, profile, extruder, mesh
	index:number // which extruder or mesh does this override apply to (0 for machine and profile)
	value:number // actual override value
}

export default class SettingsItem {
    key:string = "";
    label       : string;
    category    : string;
    description : string;
    type        : string;
    value:number = 0;
    defaultValue:number = 0;
    minValue    : number;
    minValueWarn: number;
    maxValue    : number;
    maxValueWarn: number;
    unit        : string;
	settablePer = {
		machine: true,
		profile: true,
		extruder: true,
		mesh: true
	}
	overrides:Override[] = [];
	[key:string]: any; // Add index signature

	constructor( config:any ) {
		Object.keys( config ).forEach( ( key:string ) => {
			if ( key === "settablePerExtruder" ) {
				this.settablePer.extruder = config[ key ];
			} else if ( key === "settablePerMesh" ) {
				this.settablePer.extruder = config[ key ];
			} else {
				this[ key ] = config[ key ];
			}
		});

		this.value = this.defaultValue;
	}
}
