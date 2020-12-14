import SettingsItem from "./SettingsItem";

export default class SettingsLayer {

    _parent: SettingsLayer|null;
    _settings: SettingsItem[];
    _children: SettingsLayer[];

    constructor( settings:SettingsItem[], parent:SettingsLayer|null = null ) {
    	this._settings = settings;
    	this._parent = parent;
    	if ( parent ) {
    		parent.children.push( this );
    	}
    }

    addSettings( settingObject: SettingsItem|SettingsItem[] ) {

    }

    get children() {
    	return this._children;
    }

    get parent() {
    	return this._parent;
    }

    /**
     * Returns an object of it and all of its parents and grandparents
     */
    get flattened() {
    	return {};
    }
}
