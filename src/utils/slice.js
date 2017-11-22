const Three = require("three");
module.exports = function( mesh, thickness ) {
	// Get bounding box:
	let box = new Three.Box3().setFromObject( mesh );

	let height = 0;
	let slices = new Three.Object3D();
	let plane = new Three.Plane();
	let normal = new Three.Vector3( 0, 0, -1 );
	plane.set( normal, height );
	var helper = new Three.PlaneHelper( plane, 100, 0xffff00 );
	// STORE.state.scene.add( helper );
	let material = new Three.LineBasicMaterial({ color: 0xffff00 });

	while ( height < box.getSize().z ) {
		// Move slice plane up:
		height += thickness;
		plane.set( normal, height );

		// Create new geometry to hold this slice:
		let slice = new Three.Geometry();

		// Create some reusable vertices for each face:
		let vertices = {
			a: new Three.Vector3(),
			b: new Three.Vector3(),
			c: new Three.Vector3()
		};

		// For every face of the mesh...
		mesh.geometry.faces.forEach( face => {

			// ...gather up the world space coordinates of each vertex of the face:
			let indices = [ "a", "b", "c" ];
			for ( let i of indices ) {
				let vertex = mesh.geometry.vertices[ face[ i ] ];
				mesh.localToWorld( vertices[ i ].copy( vertex ) );
			}

			let lineAB = new Three.Line3( vertices.a, vertices.b );
			let lineBC = new Three.Line3( vertices.b, vertices.c );
			let lineCA = new Three.Line3( vertices.c, vertices.a );

			function setPointOfIntersection( line ) {
				let intersect = plane.intersectLine( line );
				if ( intersect ) {
					slice.vertices.push( intersect.clone() );
				};
			}
			setPointOfIntersection( lineAB );
			setPointOfIntersection( lineBC );
			setPointOfIntersection( lineCA );
		});
		// console.log( slice.vertices.length );
		if ( slice.vertices.length > 0 ) {
			let line = new Three.LineSegments( slice, material );
			slices.add( line );
		}
	}
	slices.name = "slices";
	return slices;
};
