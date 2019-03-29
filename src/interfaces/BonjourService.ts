interface BonjourService {
	addresses: string[],          // e.g. ["10.183.0.67"]
    fqdn: string,                 // e.g. "ultimakersystem-ccbdd3005b33._ultimaker._tcp.local"
    host: string,                 // e.g. "ultimakersystem-ccbdd3005b33.local"
    name: string,                 // e.g. "ultimakersystem-ccbdd3005b33"
    port: number,                 // e.g. 80
    protocol: string,             // e.g. "tcp"
	subtypes: any[],              // Not sure what goes here...
	rawTxt: any,                  // Actually, a buffer
	referer: {
		address: string,          // e.g. "10.183.0.67"
		family: string,           // e.g. "IPv4"
		port: number,             // e.g. 5353
		size: number              // e.g. 835
	},
	type: string,                 // e.g. "ultimaker"
	txt: {
		cluster_size: string,     // e.g. "1"
		firmware_version: string, // e.g. "5.2.2.20190206"
		hotend_serial_0: string,  // e.g. "8dfdcb1b0000"
		hotend_serial_1: string,  // e.g. "ec995d1e0000"
		hotend_type_0: string,    // e.g. "AA 0.4"
		hotend_type_1: string,    // e.g. "AA 0.4"
		machine: string,          // e.g. "9051.0"
		name: string,             // e.g. "My-Printer"
		type: string,             // e.g. "printer"
	}
}

export default BonjourService;
