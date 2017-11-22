import Slider from "./Slider.js";
export default {
	name: "Sidebar",
	components: {
		Slider
	},
	template: `
		<div class='sidebar'>

			<!-- <Slider/>
			<select>
				<option value="volvo">Volvo</option>
				<option value="saab">Saab</option>
				<option value="mercedes">Mercedes</option>
				<option value="audi">Audi</option>
			</select> -->
			<p>Set Slice Thickness</p>
			<button @click='click(0.5)'>0.5</button>
			<button @click='click(1.0)'>1.0</button>
			<button @click='click(1.5)'>1.5</button>
			<button @click='click(2.0)'>2.0</button>
		</div>
	`,
	data: function() {
		return {};
	},
	methods: {
		click( value ) {
			this.$store.dispatch("setThickness", value );
			return value;
		}
	}
};
