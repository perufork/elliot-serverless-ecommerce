import React from "react";
import { Flex, Item } from "react-flex-ready";
import { useForm } from "react-hook-form";
import Button from "components/common/Button";
import cn from "classnames";
import InputContainer from "components/common/InputContainer";
import Stars from "components/common/Stars";

import {
	Addition,
	Description,
	Review,
	ReviewUser,
	TwoColumns
} from "./styles";

import {
	FacebookIconLogin,
	TwiterIconLogin
} from "components/common/Icons/SocialIcon";

const TabDescription = () => {
	return (
		<Description as={Flex} align="start">
			<Item
				className="tab__information"
				col={8}
				colTablet={12}
				colMobile={12}
				gap={2}
			>
				<h3>Introduction</h3>
				<p>
					With ultralight, quality cotton canvas, the JanSport Houston backpack
					is ideal for a life-on-the-go. This backpack features premium faux
					leather bottom and trim details, padded 15 in laptop sleeve and tricot
					lined tablet sleeve
				</p>
				<h3>Features</h3>
				<ul>
					<li>Fully padded back panel, web hauded handle</li>
					<li>
						Internal padded sleeve fits 15″ laptop &amp; unique fabric
						application
					</li>
					<li>Internal tricot lined tablet sleeve</li>
					<li>One large main compartment and zippered</li>
					<li>Premium cotton canvas fabric</li>
				</ul>
			</Item>
			<Item className="tab__image" col={4} colTablet={12} colMobile={12}>
				<img src="https://via.placeholder.com/470x600" alt="" />
			</Item>
		</Description>
	);
};

const TabAdditionInformation = () => {
	return (
		<Addition>
			<table>
				<tr>
					<td className="td__key">Weight</td>
					<td>2 kg</td>
				</tr>
				<tr>
					<td className="td__key">Color</td>
					<td>Black, Brown, White</td>
				</tr>
				<tr>
					<td className="td__key">Dimensions</td>
					<td>8 x 6 x 2cm</td>
				</tr>
			</table>
		</Addition>
	);
};

const TabReview = () => {
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = data => {
		console.log(errors);
		console.log(data);
	};

	return (
		<Review>
			<h4>1 review for Contrasting Design T-Shirt</h4>
			<ReviewUser as={Flex} align="center">
				<Item className="user_image" col={1} colTablet={12} colMobile={12}>
					<img src="https://i.pravatar.cc/70?img=44" alt="" />
				</Item>
				<Item
					className="user__information"
					col={11}
					colTablet={12}
					colMobile={12}
				>
					<Stars stars={4} />
					<h4>
						Martin Katrina <span>- June 20, 2019</span>
					</h4>
					<p>Aenean sit amet odio est.</p>
				</Item>
			</ReviewUser>
			<h5>Add a review</h5>
			<p>
				<small>Connect with:</small>
			</p>
			<ul className="social__connect">
				<li className="social__connect__item">
					<a href="#">
						<FacebookIconLogin />
					</a>
				</li>
				<li className="social__connect__item">
					<a href="#">
						<TwiterIconLogin />
					</a>
				</li>
			</ul>
			<p>
				<small>
					Your email address will not be published. Required fields are marked *
				</small>
			</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputContainer className={cn({ has__error: errors.review })}>
					<Stars stars={4} />
				</InputContainer>
				<InputContainer className={cn({ has__error: errors.review })}>
					<label htmlFor="review">Your Review:</label>
					<textarea name="review" rows="6" ref={register({ required: true })} />
					{errors.review && <span>This field is required</span>}
				</InputContainer>
				<TwoColumns as={Flex} align="start">
					<Item col={6} colTablet={12} colMobile={12}>
						<InputContainer className={cn({ has__error: errors.review })}>
							<label htmlFor="name">Name:</label>
							<input name="name" ref={register({ required: true })} />
							{errors.name && <span>This field is required</span>}
						</InputContainer>
					</Item>
					<Item col={6} colTablet={12} colMobile={12}>
						<InputContainer className={cn({ has__error: errors.review })}>
							<label htmlFor="email">Email:</label>
							<input
								name="email"
								type="email"
								ref={register({ required: true })}
							/>
							{errors.email && <span>This field is required</span>}
						</InputContainer>
					</Item>
				</TwoColumns>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</form>
		</Review>
	);
};

export { TabDescription, TabAdditionInformation, TabReview };
