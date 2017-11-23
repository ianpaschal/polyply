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
			this.mouse.screen.x = e.offsetX;
			this.mouse.screen.y = e.offsetY;
			this.raycast();
			// this.$store.dispatch("updateBlueprint", this.quantized.world );
			// ipcRenderer.send("update_blueprint", this.quantized.world );
			if ( this.$store.state.move ) {
				let intersects = this.raycaster.intersectObject( this.$store.state.gizmo, true );

				// if there is one (or more) intersections
				if ( intersects.length > 0 ) {
					// if the closest object intersected is not the currently stored intersection object
					if ( intersects[ 0 ].object != this.INTERSECTED ) {
						// restore previous intersection object (if it exists) to its original color
						if ( this.INTERSECTED ) {
							if ( this.INTERSECTED.name === "handle") {
								for ( let child of this.INTERSECTED.children ) {
									child.material.color.setHex( this.INTERSECTED.currentHex );
								}
							} else {
								this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
								this.INTERSECTED.material.opacity = this.INTERSECTED.originalOpacity;
							}

						}

						if ( intersects[ 0 ].object.parent.name === "handle") {
							this.INTERSECTED = intersects[ 0 ].object.parent;
							// store color of closest object (for later restoration)
							this.INTERSECTED.currentHex = this.INTERSECTED.children[ 0 ].material.color.getHex();
							// set a new color for closest object
							for ( let child of this.INTERSECTED.children ) {
								child.material.color.setHex( 0xffff00 );
							}
						} else {
							// store reference to closest object as current intersection object
							this.INTERSECTED = intersects[ 0 ].object;
							// store color of closest object (for later restoration)
							this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();
							this.INTERSECTED.originalOpacity = this.INTERSECTED.material.opacity;
							// set a new color for closest object
							this.INTERSECTED.material.color.setHex( 0xffff00 );
							this.INTERSECTED.material.opacity = 1.0;
						}
					}
				}
				// there are no intersections
				else {
					// restore previous intersection object (if it exists) to its original color
					if ( this.INTERSECTED ) {
						if ( this.INTERSECTED.name === "handle") {
							for ( let child of this.INTERSECTED.children ) {
								child.material.color.setHex( this.INTERSECTED.currentHex );
							}
						} else {
							this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
							this.INTERSECTED.material.opacity = this.INTERSECTED.originalOpacity;
						}

					}
					// remove previous intersection object reference
					// by setting current intersection object to "nothing"
					this.INTERSECTED = null;
				}

			}
		},
		mouseup( e ) {
			if ( !this.$store.state.move ) {
				let intersects = this.raycaster.intersectObjects( this.$store.state.scene.children, true );
				if ( intersects[ 0 ] ) {
					console.log( intersects[ 0 ].object.name );
				} else {
					console.log("Hit nothing");
				}
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
