const Three = require("three");
let Gizmo = function() {
	let size = 64;
	this.size = size;
	this.init = function() {
		Three.Object3D.call( this );
		this.handles = new Three.Object3D();
		this.pickers = new Three.Object3D();
		this.planes = new Three.Object3D();
		this.add( this.handles ); /*lines*/
		this.add( this.pickers );
		this.add( this.planes );

		function createHandle( axis ) {
			let handle = new Three.Object3D();
			handle.name = "handle";
			let color = new Three.Color();
			switch ( axis ){
				case "x": color.set( 0xff0000 ); break;
				case "y": color.set( 0x00ff00 ); break;
				case "z": color.set( 0x0000ff ); break;
			}
			// Line:
			let lineGeo = new Three.Geometry();
			let lineMat = new Three.LineBasicMaterial({ color: color });
			lineGeo.vertices.push( new Three.Vector3(), new Three.Vector3() );
			lineGeo.vertices[ 1 ].y = size;
			handle.add( new Three.Line( lineGeo, lineMat ) );
			// Mesh
			var coneGeo = new Three.ConeBufferGeometry( 4, 16, 32 );
			var coneMat = new Three.MeshBasicMaterial({ color: color });
			let cone = new Three.Mesh( coneGeo, coneMat );
			cone.position.y += size - 8;
			handle.add( cone );
			if ( axis === "x") {
				handle.rotation.z += Math.PI / -2;
			}
			if ( axis === "z") {
				handle.rotation.x += Math.PI / 2;
			}
			return handle;
		}
		this.handles.add( createHandle("x") );
		this.handles.add( createHandle("y") );
		this.handles.add( createHandle("z") );

		function createPlane( axis ) {
			let handle = new Three.Object3D();
			let color = new Three.Color( 0xffffff );
			switch ( axis ){
				case "x": color.set( 0x00ffff ); break;
				case "y": color.set( 0xff00ff ); break;
				case "z": color.set( 0xffff00 ); break;
			}
			// Mesh
			var geometry = new Three.PlaneBufferGeometry( size / 4, size / 4 );
			var material = new Three.MeshBasicMaterial({
				color: color,
				side: Three.DoubleSide,
				transparent: true,
				opacity: 0.5
			});
			let plane = new Three.Mesh( geometry, material );

			switch ( axis ){
				case "x":
					plane.position.y += size / 8;
					plane.position.z += size / 8;
					plane.rotation.y += Math.PI / 2;
					break;
				case "y":
					plane.position.x += size / 8;
					plane.position.z += size / 8;
					plane.rotation.x += Math.PI / -2;
					break;
				case "z":
					plane.position.y += size / 8;
					plane.position.x += size / 8;
					break;
			}
			handle.add( plane );
			return handle;
		}
		this.planes.add( createPlane("x") );
		this.planes.add( createPlane("y") );
		this.planes.add( createPlane("z") );

	};
	this.init();
	return this;
};

Gizmo.prototype = Object.create( Three.Object3D.prototype );
Gizmo.prototype.constructor = Gizmo;

module.exports = Gizmo;
