import { app, ipcRenderer } from "electron";
import FS from "fs";
import Path from "path";
import Stats from "stats-js";
import * as Three from "three";
import Vue from "vue";
import Vuex from "vuex";

// Components:
import Frame from "./components/Frame.js";

// Data:
import STORE from "./store";

import OrbitControlModule from "three-orbit-controls";
const OrbitControls = OrbitControlModule( Three );

import buildScene from "./utils/buildScene.js";

const Gizmo = require("./core/Gizmo.js");

let controls, stats, camera, renderer, helper;
let SCENE = new Three.Scene();

window.onload = function() {
	new Vue({
		el: "#vue-wrapper",
		store: STORE,
		data: function() {
			return {
				windowWidth: 0,
				windowHeight: 0
			};
		},
		render: h => h( Frame ),
		beforeMount() {
			window.addEventListener("resize", this.getWindowWidth );
			window.addEventListener("resize", this.getWindowHeight );
		},
		mounted: function() {
			this.$nextTick(function() {
				let keyboardEvents = [ "keydown", "keyup" ];
				for ( let event of keyboardEvents ) {
					// window.addEventListener( event, handleKeyboard, false );
				}
				STORE.state.scene.add( buildScene( STORE.state.bounds ) );
				let gizzy = new Gizmo();
				// STORE.state.scene.add( gizzy );
				STORE.state.gizmo = gizzy;
			});
		},
		beforeDestroy() {
			window.removeEventListener("resize", this.getWindowWidth );
			window.removeEventListener("resize", this.getWindowHeight );
		},
		methods: {
			getWindowWidth: function( e ) {
				this.windowWidth = document.documentElement.clientWidth;
			},
			getWindowHeight: function( e ) {
				this.windowHeight = document.documentElement.clientHeight;
			}
		}
	});
};
