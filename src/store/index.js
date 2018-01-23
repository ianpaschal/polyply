const Three = require("three");
const Vue = require("vue/dist/vue.common.js");
const Vuex = require("vuex");

const Slice = require("../utils/slice.js");
console.log( Slice );
let OBJLoader = require("three-obj-loader")( Three );
let STLLoader = require("three-stl-loader")( Three );

Vue.use( Vuex );

module.exports = new Vuex.Store({

	state: {
		scene: new Three.Scene(),
		bounds: {
			x: 200,
			y: 200,
			z: 400
		},
		sliceThickness: 2,
		move: true,
		gui: {
			showObjectEdge: true,
			showGizmos: false,
			showSceneBorders: true,
			objectEdgeSize: 8,
			gizmoSize: 64
		}
	},
	getters: {},
	mutations: {
		toggleDragging( state ) {
			if ( state.dragging ) {
				state.dragging = false;
			} else {
				state.dragging = true;
			}
			return;
		},
		price( state, payload ) {
			state.price = payload;
		},
		build( state ) {
			state.finance.balance -= state.price;
			state.price = 0;
		},
		balance( state, payload ) {
			state.finance.balance -= payload;
		},
		setActive( state, payload ) {
			state.active = payload;
		},
		setSliceThickness(state, payload) {
			state.sliceThickness = payload;
		}
	},
	actions: {
		loadFile( context, path ) {
			console.log( path );
			let loader, onLoad, onProgress, onError;
			// console.log( OBJLoader );
			loader = new STLLoader;

			let model;

			onProgress = function( xhr ) {
				if ( xhr.lengthComputable ) {
					let percentComplete = xhr.loaded / xhr.total * 100;
					console.log( Math.round( percentComplete, 2 ) + "% downloaded" );
				}
			};
			onError = function( xhr ) {

			};
			onLoad = function( object ) {

				let geometry, material;

				console.log( object );

				if ( object.children ) {
					geometry = new Three.Geometry().fromBufferGeometry(
						object.children[ 0 ].geometry
					);
				} else {
					geometry = new Three.Geometry().fromBufferGeometry( object );
				}

				geometry.mergeVertices();
				geometry.computeBoundingSphere();
				geometry.computeFaceNormals();
				geometry.computeVertexNormals();

				console.log( geometry );
				material = new Three.MeshPhongMaterial({
					color: 0xcccccc,
					specular: 0xffffff,
					shininess: 5,
					side: Three.DoubleSide,
					flatShading: true
				});
				model = new Three.Mesh( geometry, material );
				// model.rotation.x += Math.PI / 2;
				model.updateMatrix();
				// model.name = path.split("\\").pop().split("/").pop();
				model.name = "model";
				let box = new Three.Box3().setFromObject( model );
				console.log( box );
				// model.position.x += box.min.x - box.max.x;
				model.position.y -= box.max.y - (Math.abs( box.max.y - box.min.y ) / 2);
				model.updateMatrix();
				context.state.scene.add( model );



				let slices = Slice( model, context.state.sliceThickness );
				context.state.scene.add( slices );
				slices.position.x += 75;

			};

			// Go for it!
			loader.load( path, onLoad, onProgress, onError );



		},
		updateBlueprint( context, position ) {

		},
		finishBlueprint( context, position ) {

		},
		setThickness(context, amount) {
			context.commit("setSliceThickness", amount );

			if ( context.state.scene.getObjectByName("slices") ) {
				context.state.scene.remove( context.state.scene.getObjectByName("slices") );
			}
			let model = context.state.scene.getObjectByName("model");
			let slices = Slice( model, context.state.sliceThickness );
			context.state.scene.add( slices );
			slices.position.x += 75;

		}
	}
});
