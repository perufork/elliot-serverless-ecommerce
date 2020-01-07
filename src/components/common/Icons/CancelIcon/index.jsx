import StyledIcon from "components/common/StyledIcon";

const CancelIcon = ({ width = 24, height = 24, color = "#010002" }) => (
	<StyledIcon
		width={width}
		height={height}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 224.512 224.512"
	>
		<path
			fill={color}
			d="M224.507 6.997L217.521 0 112.256 105.258 6.998 0 .005 6.997l105.258 105.257L.005 217.512l6.993 7L112.256 119.24l105.265 105.272 6.986-7-105.258-105.258z"
		/>
	</StyledIcon>
);

export { CancelIcon };
