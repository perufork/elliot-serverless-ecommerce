import Link from "next/link";
import Logo from "components/common/Logo";

const Brand = () => (
	<Link href="/">
		<a>
			<Logo width={48} height={48} />
		</a>
	</Link>
);

export default Brand;
