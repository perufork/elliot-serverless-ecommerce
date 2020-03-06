import Brand from "./components/Brand";
import Links from "./components/Links";
import Buttons from "./components/Buttons";
import { Wrapper, Options } from "./styles";
import Sidebar from "components/theme/Header/components/Sidebar";
import { useSidebar, useDispatchSidebar } from "providers/SidebarProvider";

export default ({ collections }) => {
	const { state } = useSidebar();
	const { dispatch } = useDispatchSidebar();

	const toggleSidebar = ({ type, content }) => {
		dispatch({
			type,
			content
		});
	};

	return (
		<>
			<Sidebar
				visibleSidebar={state.open}
				toggleSidebar={toggleSidebar}
				content={state.content}
			/>
			<Wrapper>
				<Brand />
				<Links collections={collections} />
				<Options>
					<Buttons toggleSidebar={toggleSidebar} />
				</Options>
			</Wrapper>
		</>
	);
};
