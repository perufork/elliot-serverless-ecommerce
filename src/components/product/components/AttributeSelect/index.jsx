import { useMemo, useState } from "react";
import CommonAttributes from "helpers/attributes.json";

const AttributeSelect = ({
	activeProductQuantity: quantity,
	setSelectedSkuIndex,
	onQuantityChange,
	selectedSkuIndex,
	isPaymentButtonDisabled,
	setPaymentButtonStatus,
	cartHasAll,
	onlyOneLeft,
	cart,
	product
}) => {
	const skusMemo = useMemo(() => product.skus.edges, [
		JSON.stringify(cart),
		JSON.stringify(product.skus.edges)
	]);

	const attributeSchema = product.attributes;

	console.log({ attributeSchema });

	const buildKeyOrder = attributeSchema =>
		attributeSchema.map(({ attributeKey }) => attributeKey);

	const initialSelectedValues = useMemo(() => {
		const selectedSku = skusMemo[selectedSkuIndex];

		let initialSelectedValuesArray = [];

		// if (attributeSchema) {
		// 	const keyOrder = buildKeyOrder(attributeSchema);
		// 	initialSelectedValuesArray = attributeSchema.map(
		// 		(_, i) =>
		// 			selectedSku.attributeSchema[keyOrder[i]] ||
		// 			selectedSku.attributes[keyOrder[i]]
		// 	);
		// }

		return initialSelectedValuesArray;
	}, []);

	const [selectedValues, setSelectedValues] = useState(initialSelectedValues);

	const buildSkuDictionary = (keyOrder, attributeSchem, skuss) => {
		// dictionary with each level's keys being attribute values, mapping to an
		// index in the array product.skus; dictionary contains all possible
		// permutations of attribute values, with an index of -1 for invalid
		// permutations
		const skuDictionary = {};

		if (attributeSchem != null) {
			// use as stack for breadth-first population of nested sku dictionary
			let currentLevel = [skuDictionary];

			for (let i in attributeSchem) {
				let values = attributeSchem[i]["attributeValues"];
				// create a sub-dictionary at each level, with levels corresponsding
				// to attribute values
				let nextLevel = [];
				while (currentLevel.length !== 0) {
					let currentItem = currentLevel.pop();
					for (let j in values) {
						let nextItem = {};
						currentItem[values[j]] = nextItem;
						nextLevel.push(nextItem);
					}
				}
				currentLevel = nextLevel;
			}

			// initialize indicies of all attribute value permutations in sku
			// dictionary to -1
			while (currentLevel.length !== 0) {
				const currentItem = currentLevel.pop();
				currentItem["skuIndex"] = -1;
			}

			// set indicies of valid attribute value permutations to their
			// respective sku's index
			for (let j in skuss) {
				if (skuss[j].quantity <= 0) {
					continue;
				}
				let item = skuDictionary;
				for (let k in keyOrder) {
					const value =
						skuss[j].attributeSchema[keyOrder[k]] ||
						skuss[j].attributes[keyOrder[k]];
					item = item[value];
				}
				item["skuIndex"] = j;
			}
		}

		return skuDictionary;
	};

	const buildAttributeDictionary = (keyOrder, attributeSchem, skuss) => {
		// dictionary that maps single attribute values to valid sku indicies
		const attributeDictionary = [];

		if (attributeSchem != null) {
			for (let i in attributeSchem) {
				let values = attributeSchema[i]["attributeValues"];

				// initialize attribute dictionary with all values mapping to empty
				// arrays
				let valuesMap = {};
				for (let j in values) {
					valuesMap[values[j]] = [];
				}
				attributeDictionary.push(valuesMap);
			}

			// set indicies of valid attribute value permutations to their
			// respective sku's index
			for (let j in skuss) {
				for (let k in keyOrder) {
					const value =
						skuss[j].Object.entries(attribute_json)[keyOrder[k]] ||
						skuss[j].attributes[keyOrder[k]];
					attributeDictionary[parseInt(k)][value].push(j);
				}
			}
		}
		return attributeDictionary;
	};

	const toggleSelectionChange = (
		selectState,
		selectIndex,
		keyOrder,
		skuDictionary,
		attributeDictionary
	) => {
		const numAttributes = attributeSchema.length;

		const newSelectedValues = [...selectedValues];
		newSelectedValues[selectIndex] = selectState.target.value;

		let item = skuDictionary;
		for (let i = 0; i < numAttributes; i++) {
			item = item[newSelectedValues[i]];
		}
		let newSelectedSkuIndex = item.skuIndex;
		if (newSelectedSkuIndex === -1) {
			const skuIndex =
				attributeDictionary[selectIndex][selectState.target.value][0];
			newSelectedSkuIndex = skuIndex;
			const sku = skusMemo[skuIndex];
			for (let i = 0; i < numAttributes; i++) {
				newSelectedValues[i] = Object.entries(sku.attributes)[keyOrder[i]];
			}
		}
		setSelectedValues(newSelectedValues);

		setSelectedSkuIndex(newSelectedSkuIndex);
	};

	const keyOrder = buildKeyOrder(attributeSchema);

	const skuDictionary = buildSkuDictionary(keyOrder, attributeSchema, skusMemo);
	const attributeDictionary = buildAttributeDictionary(
		keyOrder,
		attributeSchema,
		skusMemo
	);

	const numAttributes = attributeSchema.length;

	const dropdowns = [];

	for (let i in attributeSchema) {
		const key = attributeSchema[i]["attributeKey"];
		const values = attributeSchema[i]["attributeValues"];

		// for each attribute selector, determine selectability of options on
		// the state of other selectors
		let permutation = [];
		for (let j = 0; j < i; j++) {
			permutation.push(selectedValues[j]);
		}
		permutation.push(null); // initial value for current selector
		for (let j = parseInt(i) + 1; j < numAttributes; j++) {
			permutation.push(selectedValues[j]);
		}

		let valueElements = [];

		for (let j in values) {
			permutation[parseInt(i)] = values[j];
			let level = skuDictionary;
			for (let k = 0; k < numAttributes; k++) {
				level = level[permutation[k]];
			}

			let skuIndex = level["skuIndex"];
			if (skuIndex == -1) {
				valueElements.push(
					<option key={j} value={values[j]}>
						{values[j]} - OUT OF STOCK
					</option>
				);
			} else {
				valueElements.push(
					<option key={j} value={values[j]}>
						{values[j]}
					</option>
				);
			}
		}

		const commonAttribute = CommonAttributes[key.toUpperCase()];
		let label;
		if (commonAttribute) {
			label = CommonAttributes.properties[commonAttribute].key;
		} else {
			label = key;
		}

		dropdowns.push(
			<div className="form-group product-attribute" key={i}>
				<label style={{ padding: "12px 0" }}>{label}</label>
				{console.log({ valueElements })}
				<select
					className="form-control"
					onChange={selectState =>
						toggleSelectionChange(
							selectState,
							i,
							keyOrder,
							skuDictionary,
							attributeDictionary
						)
					}
					value={selectedValues[i]}
				>
					{valueElements}
				</select>
				<style jsx>{`
					.product-attribute {
						margin-bottom: 10px;
					}
				`}</style>
			</div>
		);
	}

	return <div className="dropdown-container">{dropdowns}</div>;
};

export default AttributeSelect;
