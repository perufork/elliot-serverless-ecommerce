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
				bg: "none",
				border: "2px solid #222",
				hover: {
					bg: "#f68773",
					color: "#fff"
				}
			},
			outlined: {
				color: "#bbb",
				padding: "12px 10px",
				border: "2px solid #eaeaea",
				hover: {
					color: "#222"
				}
			},
			flat: {
				color: "#222",
				border: "none",
				bg: "#e4e4e4",
				hover: {
					color: "#fff",
					bg: "#f68773"
				}
			},
			ghost: {
				color: "#fff",
				border: "none",
				bg: "#222",
				hover: {
					color: "#fff",
					bg: "#f68773"
				}
			}
		}
	}
};
