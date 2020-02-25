import Link from "next/link";
import Dropdown from "components/common/Dropdown";
import Container from "components/common/Container";
import {
	CopyWrapper,
	Item,
	List,
	ListTitle,
	Navigation,
	Separator,
	Wrapper
} from "./styles";

const Footer = () => (
	<Wrapper>
		<Navigation>
			<List>
				<ListTitle>Help &amp; Information</ListTitle>
				<Item>
					<Link href="">
						<a>Track Order</a>
					</Link>
				</Item>
				<Item>
					<Link href="">
						<a>Delivery &amp; Returns</a>
					</Link>
				</Item>
				<Item>
					<Link href="">
						<a>Premier Delivery</a>
					</Link>
				</Item>
				<Item>
					<Link href="">
						<a>FAQs</a>
					</Link>
				</Item>
			</List>
			<List>
				<ListTitle>About Elliot</ListTitle>
				<Item>
					<Link href="">
						<a>About us</a>
					</Link>
				</Item>
				<Item>
					<Link href="">
						<a>Careers</a>
					</Link>
				</Item>
				<Item>
					<Link href="">
						<a>Coporate</a>
					</Link>
				</Item>
				<Item>
					<Link href="">
						<a>Investors</a>
					</Link>
				</Item>
			</List>
			<List>
				<ListTitle>Online Shop</ListTitle>
				<Item>
					<Link href="">
						<a>Shoes</a>
					</Link>
				</Item>
				<Item>
					<Link href="">
						<a>Bags</a>
					</Link>
				</Item>
				<Item>
					<Link href="">
						<a>Wallets</a>
					</Link>
				</Item>
				<Item>
					<Link href="">
						<a>Belts</a>
					</Link>
				</Item>
			</List>
			<List>
				<ListTitle>Language</ListTitle>
				<Dropdown
					standalone
					options={["English", "Italian", "Spanish", "French"]}
					displayDefaultValue
				/>
			</List>
			<List>
				<ListTitle>Currency</ListTitle>
				<Dropdown standalone options={["USD", "GPB"]} displayDefaultValue />
			</List>
		</Navigation>
		<Separator />
		<Container>
			<CopyWrapper>
				<p>
					© 2020 <span>Elliot.</span> All rights reserved.
				</p>
				<ul>
					<li>
						<Link href="">
							<a>Privacy Policy</a>
						</Link>
					</li>
					<li>
						<Link href="">
							<a>Terms of Use</a>
						</Link>
					</li>
				</ul>
			</CopyWrapper>
		</Container>
	</Wrapper>
);

export default Footer;
