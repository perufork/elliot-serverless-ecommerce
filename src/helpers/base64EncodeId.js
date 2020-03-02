const base64EncodeId = (nodeName, id) => {
	return btoa(`${nodeName}:${id}`)
		.replace("+", "-")
		.replace("/", "_")
		.replace("=", "");
};

export default base64EncodeId;
