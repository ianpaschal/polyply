const { dialog } = require("electron" ).remote;
import Viewport from "./Viewport.js";
import Sidebar from "./Sidebar.js";
export default {
	name: "Frame",
	components: {
		Viewport,
		Sidebar
	},
	template: `
		<div id='app'>

			<div class='frame-top'>
				<div class='title-bar'>
					<h1>PoliPly</h1>
				</div>
				<div class='toolbar'>
					<button @click='loadFile()'>
						<img class='icon' v-bind:src='iconPath'/>
					</button>
				</div>
			</div>

			<div class='frame-mid'>
				<Viewport></Viewport>
				<Sidebar></Sidebar>
			</div>

			<div class='frame-bottom'>
				<div class='footer'>
					<p>Slicing progress bar needed...</p>
				</div>
			</div>

		</div>
	`,
	data: function() {
		return {
			iconPath: "../assets/svg/icon-import.svg"
		};
	},
	methods: {
		loadFile() {
			let paths = dialog.showOpenDialog({
				defaultPath: "/Users/Ian/Desktop",
				buttonLabel: "Import",
				properties: [ "openFile", "openDirectory", "multiSelections" ],
				filters: [
					{ name: "Custom File Type", extensions: [ "obj", "stl" ] }
				]
			});
			this.$store.dispatch("loadFile", paths[ 0 ] );
		}
	}
};
