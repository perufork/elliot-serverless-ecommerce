export default {
	fonts: {
		primary: "Roboto"
	},
	colors: {
		accent: "#f68773",
		black: "#222",
		darkBlack: "#000",
		darkGray: "#999",
		lightGray: "#bbb",
		lightnessGray: "#eaeaea",
		red: "#ff1d5d",
		white: "#fff"
	},
	transitions: {
		custom400: "all 400ms cubic-bezier(0.7, 0, 0.3, 1)",
		custom750: "all 750ms cubic-bezier(0.77, 0, 0.175, 1)",
		default200: "all 200ms ease",
		default300: "all 300ms ease",
		default400: "all 400ms ease",
		default800: "all 800ms ease"
	},
	button: {
		lineHeight: "20px",
		border: "none",
		transition: "all .4s ease",
		cursor: "pointer",
		display: "inline-block",
		padding: "15px 35px",
		fontSize: "14px",
		fontWeight: 600,
		textTransform: "uppercase",
		variants: {
			primary: {
				color: "#fff",
				bg: "#222",
				hover: {
					bg: "#f68773"
				}
			},
			secondary: {
				color: "#222",
				bg: "none",
				border: "2px solid #222",
				hover: {
					bg: "#f68773",
					color: "#fff"
				}
			}
		}
	}
};
