const Three = require("three");
module.exports = function( bounds ) {
	let material = new Three.LineBasicMaterial({ color: 0x00E6FF });
	let geometry = new Three.Geometry();

	let objects = new Three.Object3D();
	geometry.vertices.push(
		new Three.Vector3( -bounds.x / 2, bounds.y / 2, 0 ),
		new Three.Vector3( bounds.x / 2, bounds.y / 2, 0 ),

		new Three.Vector3( bounds.x / 2, bounds.y / 2, 0 ),
		new Three.Vector3( bounds.x / 2, -bounds.y / 2, 0 ),

		new Three.Vector3( bounds.x / 2, -bounds.y / 2, 0 ),
		new Three.Vector3( 0, -bounds.y / 2, 0 ),

		new Three.Vector3( -bounds.x / 2, 0, 0 ),
		new Three.Vector3( -bounds.x / 2, bounds.y / 2, 0 )
	);
	let line = new Three.LineSegments( geometry, material );
	objects.add( line );

	let axisHelper = new Three.AxisHelper( bounds.x / 2 );
	axisHelper.position.x = -bounds.x / 2;
	axisHelper.position.y = -bounds.y / 2;
	axisHelper.material.depthWrite = false;
	objects.add( axisHelper );

	// LIGHTS
	let ambientLight = new Three.AmbientLight( 0xffffff, 0.25 );
	objects.add( ambientLight );
	let hemiLight = new Three.HemisphereLight( 0xffffff, 0xffffff, 0.25 );
	hemiLight.color.setHSL( 0.6, 1, 0.6 );
	hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	hemiLight.position.set( 0, 0, 1 );
	objects.add( hemiLight );
	let hemiLightHelper = new Three.HemisphereLightHelper( hemiLight, 10 );
	// STORE.state.scene.add( hemiLightHelper );
	//
	let dirLight = new Three.DirectionalLight( 0xffffff, 0.5 );
	dirLight.color.setHSL( 0.1, 1, 0.95 );
	dirLight.position.set( 50, -50, 50 );
	dirLight.position.multiplyScalar( 30 );
	objects.add( dirLight );
	dirLight.castShadow = true;
	dirLight.shadow.mapSize.width = 2048;
	dirLight.shadow.mapSize.height = 2048;
	var d = 50;
	dirLight.shadow.camera.left = -d;
	dirLight.shadow.camera.right = d;
	dirLight.shadow.camera.top = d;
	dirLight.shadow.camera.bottom = -d;
	dirLight.shadow.camera.far = 3500;
	dirLight.shadow.bias = -0.0001;
	let dirLightHeper = new Three.DirectionalLightHelper( dirLight, 10 );
	// STORE.state.scene.add( dirLightHeper );

	return objects;
};
