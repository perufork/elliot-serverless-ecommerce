import { products } from "data";

export default (req, res) => {
	const filtered = products.filter(p => p.id === req.query.id);

	if (filtered.length > 0) {
		res.status(200).json(filtered[0]);
	} else {
		res
			.status(404)
			.json({ message: `Product with id: ${req.query.id} not found.` });
	}
};
