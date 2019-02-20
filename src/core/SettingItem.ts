export default class SettingItem {
    _canOverride : boolean;
    _children    : SettingItem[];
    _defaultValue: any;
    _description : string;
    _enabled     : boolean;
    _key         : string;
    _label       : string;
    _maximumValue: any;
    _minimumValue: any;
    _parent      : SettingItem;
    _type        : string;
    _unit        : string;
    _value       : any;

    constructor(key:string, value:any, canOverride:boolean = false) {
        this._key = key;
        this._value = value;
        this._canOverride = canOverride;
    }
}