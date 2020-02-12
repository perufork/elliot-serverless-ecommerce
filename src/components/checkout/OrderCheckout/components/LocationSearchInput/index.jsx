import PlacesAutocomplete, {
	geocodeByAddress
} from "react-places-autocomplete";
import { MapPin } from "components/common/Icons";
import splitAddressComponents from "helpers/splitAddressComponents";
import InputField from "components/common/InputField";
import { Wrapper, SuggestionWrapper, Icon } from "./styles";

const LocationSearchInput = ({
	onSelect,
	form,
	fieldsToUpdate,
	field,
	searchOptions,
	onBlur,
	placeholder
}) => {
	const handleChange = address => {
		form.setFieldValue(field.name, address);
	};

	const handleSelect = address => {
		geocodeByAddress(address)
			.then(results => {
				const locationValues = splitAddressComponents(results[0]);
				for (const fieldToUpdate of fieldsToUpdate) {
					const update = locationValues[fieldToUpdate];
					if (update) {
						form.setFieldValue(fieldToUpdate, update);
					}
				}

				form.setFieldValue("addressLine1", address);
				onSelect(
					locationValues["addressLine1"],
					locationValues["addressLine2"],
					locationValues["city"],
					locationValues["state"],
					locationValues["country"],
					locationValues["zipCode"]
				);
				return results;
			})
			.catch(error => form.setFieldError(field.name, error.message));
	};

	return (
		<PlacesAutocomplete
			value={field.value}
			searchOptions={searchOptions}
			onChange={handleChange}
			onSelect={handleSelect}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps }) => (
				<Wrapper>
					<InputField
						{...field}
						{...getInputProps({
							onBlur: onBlur,
							placeholder: placeholder,
							autoComplete: "new-password"
						})}
					/>
					<SuggestionWrapper>
						<div>
							{suggestions.map((suggestion, i) => {
								const className = suggestion.active
									? "single-input suggestion-item--active"
									: "single-input suggestion-item";
								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											className
										})}
										key={i}
									>
										<Icon>
											<MapPin className="places-icon" />
										</Icon>
										<span>{suggestion.description}</span>
									</div>
								);
							})}
						</div>
					</SuggestionWrapper>
				</Wrapper>
			)}
		</PlacesAutocomplete>
	);
};

export default LocationSearchInput;
