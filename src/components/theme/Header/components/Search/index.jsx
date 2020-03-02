import { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
	InstantSearch,
	SearchBox,
	Hits,
	connectStateResults,
	Configure
} from "react-instantsearch-dom";
import { Wrapper } from "./styles";
import Hit from "./components/Hit";

const searchClient = algoliasearch(
	process.env.ELLIOT_ALGOLIA_APP_ID,
	process.env.ELLIOT_ALGOLIA_API_KEY
);

const Results = connectStateResults(
	({ searchState, searchResults, children }) =>
		searchResults && searchResults.nbHits !== 0 ? (
			children
		) : (
			<div>No results have been found for {searchState.query}.</div>
		)
);

const Search = () => {
	const [search, toggleSearch] = useState(false);

	const handleSearchChange = e => {
		if (e.target.value === "") {
			return toggleSearch(false);
		}
		toggleSearch(true);
	};

	return (
		<Wrapper>
			<InstantSearch
				searchClient={searchClient}
				indexName={`elliot_product_index_${process.env.ENVIRONMENT}`}
			>
				<Configure
					hitsPerPage={20}
					filters={`'domain_id':${process.env.ELLIOT_DOMAIN_ID} AND 'filter_param':'PUBLISHED' AND 'productCheckouts.slug':${process.env.ELLIOT_STORE_FRONT_NAME}`}
				/>
				<SearchBox
					autoFocus={false}
					onClick={e => handleSearchChange(e)}
					onChange={e => handleSearchChange(e)}
					onReset={() => toggleSearch(false)}
				/>
				{search && (
					<Results>
						<Hits hitComponent={Hit} />
					</Results>
				)}
			</InstantSearch>
		</Wrapper>
	);
};

export default Search;
