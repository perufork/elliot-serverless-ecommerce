import { Loading } from "./styles";

const Loader = ({ isLoading }) => (
	<Loading className={!isLoading && "loaded"}>
		<div className="loader__section section__left"></div>
		<div className="loader__section section__right"></div>
	</Loading>
);

export default Loader;
