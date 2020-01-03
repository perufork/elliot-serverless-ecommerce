export default {
	fonts: {
		primary: "Roboto"
	},
	colors: {
		black: "#222",
		white: "#fff",
		lightGray: "#bbb",
		darkGray: "#999",
		accent: "#f68773"
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
				bg: "#fff",
				border: "1px solid #222",
				hover: {
					bg: "#222",
					color: "#fff"
				}
			}
		}
	}
};
