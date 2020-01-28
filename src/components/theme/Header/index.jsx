import { useState, useEffect } from "react";
import Brand from "./components/Brand";
import Links from "./components/Links";
import Buttons from "./components/Buttons";
import { Wrapper, Options } from "./styles";
import Sidebar from "components/theme/Header/components/Sidebar";
import { useSidebar, useDispatchSidebar } from "providers/SidebarProvider";

export default () => {
	const [isTop, setIsTop] = useState(true);
	const { state } = useSidebar();
	const { dispatch } = useDispatchSidebar();

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 100 ? setIsTop(false) : setIsTop(true);
		};

		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const toggleSidebar = ({ type, cart }) => {
		dispatch({
			type,
			cartContent: cart
		});
	};

	return (
		<>
			<Sidebar
				visibleSidebar={state.open}
				toggleSidebar={toggleSidebar}
				showCartContent={state.cartContent}
			/>
			<Wrapper sticky={!isTop}>
				<Brand />
				<Links />
				<Options>
					<Buttons toggleSidebar={toggleSidebar} />
				</Options>
			</Wrapper>
		</>
	);
};
