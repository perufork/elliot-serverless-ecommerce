import getProductBySlug from "helpers/buildtime/getProductBySlug";
import { ELLIOT_PREVIEW_MODE_SECRET } from "config";

export default async (req, res) => {
	if (req.query.secret !== ELLIOT_PREVIEW_MODE_SECRET || !req.query.slug) {
		return res.status(401).json({ message: "Invalid token" });
	}

	const product = await getProductBySlug(req.query.slug);

	if (!product) {
		return res.status(401).json({ message: "Invalid slug" });
	}

	res.setPreviewData({});

	res.writeHead(307, { Location: `/en/product/${product.slug}` });
	res.end();
};
