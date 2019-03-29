const bonjour = require( "bonjour" )();
const randomWords = require( "random-words" );

const printerCount = process.argv[ 2 ];
const hotendTypes = [ "AA 0.25", "AA 0.4", "AA 0.8", "BB 0.4", "BB 0.8", "CC 0.6" ];

const optionDefinitions = [
	{ name: "verbose", alias: "v", type: Boolean },
	{ name: "src", type: String, multiple: true, defaultOption: true },
	{ name: "timeout", alias: "t", type: Number }
];

const randomString = ( length ) => {
	return Math.random().toString( 36 ).replace( /[^a-z]+/g, "" ).substr( 0, length );
};

const selectRandom = ( array ) => {
	const i = Math.floor( Math.random() * array.length );
	return array[ i ];
};

for ( let i = 0; i < printerCount; i++ ) {
	const id = randomString( 12 );
	const name = randomWords({
		exactly:3,
		join: "-",
		formatter: ( word ) => {
			return word.slice( 0, 1 ).toUpperCase().concat( word.slice( 1 ) );
		}
	});
	bonjour.publish({
		name: `ultimakersystem-${ id }`,
		host: `ultimakersystem-${ id }.local`,
		type: "ultimaker",
		port: 5353,
		txt: {
			cluster_size: 1,
			firmware_version: "5.2.2.20190206",
			hotend_serial_0: `${ randomString( 8 ) }0000`,
			hotend_serial_1: `${ randomString( 8 ) }0000`,
			hotend_type_0: selectRandom( hotendTypes ),
			hotend_type_1: selectRandom( hotendTypes ),
			machine: "9051.0",
			name: name,
			type: "printer"
		}
	});
	console.log( `Created printer ${ name }...` );
}
