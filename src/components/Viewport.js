import OrbitControlModule from "three-orbit-controls";

import * as Three from "three";
const OrbitControls = OrbitControlModule( Three );

export default {
	name: "Viewport",
	components: {

	},
	template: `
		<div class="viewport"
			v-on:mousedown="mousedown"
			v-on:mousemove="mousemove"
			v-on:mouseup="mouseup"
		>

		</div>
	`,
	data() {
		return {
			styleObject: {},
			raycaster: new Three.Raycaster(),
			mouse: {
				world: new Three.Vector3(),
				screen: new Three.Vector2()
			},
			quantized: {
				world: new Three.Vector3(),
				screen: new Three.Vector2()
			}
		};
	},
	mounted() {
		this.camera = new Three.PerspectiveCamera( 45, this.aspect, 1, 10000 );
		this.camera.position.set( 256, -256, 256 );
		this.camera.up.set( 0, 0, 1 );
		this.camera.lookAt( new Three.Vector3( 0, 0, 0 ) );

		// Action!
		this.renderer = new Three.WebGLRenderer({
			alpha: true,
			antialias: false
		});
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( this.$el.offsetWidth, this.$el.offsetHeight );
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.renderReverseSided = false;

		this.$el.appendChild( this.renderer.domElement );

		this.controls = new OrbitControls( this.camera, this.$el );
		this.controls.enabled = true;

		this.loop();
	},
	computed: {
		showPrice() {
			return this.$store.state.dragging;
		},
		aspect() {
			return this.$el.offsetWidth / this.$el.offsetHeight;
		}
	},
	methods: {
		loop() {
			this.renderer.render( this.$store.state.scene, this.camera );
			requestAnimationFrame( this.loop );
		},
		// Returns position in 2D coordinates for point in 3D space:
		position2D: function( p, camera ) {
			let point, result;
			point = p.clone().project( camera );
			result = new Three.Vector2( point.x, point.y );
			if ( typeof callback === "function" ) {
				callback( result );
				return;
			}
			return result;
		},
		// Normalize 2D coordinates to center (camera):
		normalizeCenter( input, el ) {
			return new Three.Vector2(
				( input.x / el.clientWidth ) * 2 - 1,
				-( input.y / el.clientHeight ) * 2 + 1
			);
		},
		// Normalize 2D coordinates to corner (typical HTML):
		normalizeCorner( input, el ) {
			return new Three.Vector2(
				input.x * (el.clientWidth / 2) + el.clientWidth / 2,
				-1 * input.y * (el.clientHeight / 2) + el.clientHeight / 2
			);
		},
		quantize( input ) {

			let result = new Three.Vector3();
			let axes = [ "x", "y" ];
			for ( let axis of axes ) {
				result[ axis ] = Math.ceil( input[ axis ] / 16 ) * 16 - 8;
			}
			return result;
		},
		raycast() {
			this.raycaster.setFromCamera(
				this.normalizeCenter( this.mouse.screen, this.$el ),
				this.camera
			);
		},
		mousedown( e ) {
			/*
			this.$store.commit("toggleDragging");
			this.$store.state.scene.getObjectByName("cursor").visible = false;
			this.styleObject.cursor = "none";
			this.raycast();
			this.$store.dispatch("startBlueprint", this.quantized.world );
			// ipcRenderer.send("start_blueprint", this.quantized.world );
			*/
		},
		mousemove( e ) {
			this.mouse.screen.x = e.clientX;
			this.mouse.screen.y = e.clientY;
			this.raycast();
			// this.$store.dispatch("updateBlueprint", this.quantized.world );
			// ipcRenderer.send("update_blueprint", this.quantized.world );
		},
		mouseup( e ) {
			let intersects = this.raycaster.intersectObjects( this.$store.state.scene.children, true );
			/*let intersects = this.raycaster.intersectObject(
				this.$store.state.scene.getObjectByName("bulbasaur.obj"), true
			);*/
			if ( intersects[ 0 ] ) {
				console.log( intersects[ 0 ].object.name );
			} else {
				console.log("Hit nothing");
			}
			/*
			this.$store.commit("toggleDragging");
			this.styleObject.cursor = "crosshair";
			// ipcRenderer.send("finish_blueprint", this.quantized.world );
			this.$store.dispatch("finishBlueprint", this.quantized.world );
			this.$store.state.scene.getObjectByName("cursor").visible = true;
			*/
		}
	}
};
