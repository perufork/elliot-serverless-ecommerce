import StyledIcon from "components/common/StyledIcon";

const ListIcon = ({ width = 24, height = 24, color = "#222" }) => (
	<StyledIcon
		width={width}
		height={height}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 26.4828C0 11.8567 11.8567 0 26.4828 0H485.517C500.143 0 512 11.8567 512 26.4828C512 41.1088 500.143 52.9655 485.517 52.9655H26.4828C11.8567 52.9655 0 41.1088 0 26.4828Z"
			fill={color}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 238.345C0 223.719 11.8567 211.862 26.4828 211.862H485.517C500.143 211.862 512 223.719 512 238.345C512 252.971 500.143 264.828 485.517 264.828H26.4828C11.8567 264.828 0 252.971 0 238.345Z"
			fill={color}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 450.207C0 435.581 11.8567 423.724 26.4828 423.724H485.517C500.143 423.724 512 435.581 512 450.207C512 464.833 500.143 476.69 485.517 476.69H26.4828C11.8567 476.69 0 464.833 0 450.207Z"
			fill={color}
		/>
	</StyledIcon>
);

export { ListIcon };
