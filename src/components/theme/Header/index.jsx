import { useState } from "react";
import Brand from "./Brand";
import Links from "./Links";
import Buttons from "./Buttons";
import { Wrapper, Options } from "./styles";
import Sidebar from "components/theme/Sidebar";

export default () => {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<>
			<Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
			<Wrapper>
				<Brand />
				<Options>
					<Links />
					<Buttons toggleSidebar={setShowSidebar} />
				</Options>
			</Wrapper>
		</>
	);
};
