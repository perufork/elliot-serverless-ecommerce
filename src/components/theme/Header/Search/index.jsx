import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Wrapper, StyledForm } from "./styles";
import { SearchIcon } from "components/common/Icons";

const Search = () => (
	<Wrapper>
		<Formik
			initialValue={{
				search: ""
			}}
			validationSchema={Yup.object().shape({
				search: Yup.string().required()
			})}
			onSubmit={async ({ search }, { setSubmitting }) => {
				try {
					await alert(`Searching for... ${search}`);
					setSubmitting(false);
				} catch (err) {
					console.log(err);
				}
			}}
		>
			{({ isSubmitting }) => (
				<StyledForm as={Form}>
					<Field name="search" placeholder="Search Searching..." />
					<button type="submit" disabled={isSubmitting}>
						<SearchIcon />
					</button>
				</StyledForm>
			)}
		</Formik>
	</Wrapper>
);

export default Search;
