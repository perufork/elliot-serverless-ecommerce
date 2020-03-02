import { Item, Bin, Packer } from "./bin-packer";

const getParcelsFromCheckoutPackage = ({ items, packDimensions }) => {
	const packer = new Packer();
	let pack;
	let unfitItems = items;
	let productsBiggerThanPack = [];

	do {
		for (let i = 0; i < packDimensions.length; i++) {
			pack = new Bin(...packDimensions[i]);
			packer.addBin(pack);
		}

		unfitItems.forEach(itemDimensions => {
			const item = new Item(...itemDimensions);
			packer.addItem(item);
		});

		packer.pack();

		if (!pack.items[0] && packer.unfitItems[0]) {
			productsBiggerThanPack = unfitItems;
			break;
		}

		unfitItems = packer.unfitItems.map(
			({ name, height, width, depth, weight }) => [
				name,
				height,
				width,
				depth,
				weight
			]
		);
	} while (unfitItems[0]);

	const parcels = packer.bins
		.filter(({ items: iItems }) => !!iItems[0])
		.map(bin => ({
			distance_unit: "in",
			mass_unit: "oz",
			weight: bin.getPackedWeight(),
			length: bin.depth,
			width: bin.width,
			height: bin.height
		}))
		.concat(
			productsBiggerThanPack.map(([, height, width, length, weight]) => ({
				distance_unit: "in",
				mass_unit: "oz",
				weight,
				length,
				width,
				height
			}))
		);

	return parcels;
};

export default getParcelsFromCheckoutPackage;
