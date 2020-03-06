import { connectHits } from "react-instantsearch-dom";
import Hit from "../Hit";

const Results = connectHits(({ hits }) =>
	hits.map(hit => <Hit key={hit.objectID} hit={hit} />)
);

export default Results;
