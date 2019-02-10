import SettingItem from './SettingItem';

export default class SettingsLayer {

    _parent: SettingsLayer|null;
    _settings: SettingItem[];
    _children: SettingsLayer[];

    constructor( settings:SettingItem[], parent:SettingsLayer|null = null) {
        this._settings = settings;
        this._parent = parent;
        if (parent) {
            parent.children.push( this );
        }
    }

    addSettings(settingObject: SettingItem|SettingItem[]) {

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