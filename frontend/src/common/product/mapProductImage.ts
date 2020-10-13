import { Asset } from "contentful";
import ProductConfig from "../../config/product";
import { MappedProductImage } from "../types/product";

export const mapProductImageForCart = (image: Asset[]): MappedProductImage => {
	if (image && image[0]) {
		const { fileName, url } = image[0].fields.file;
		return {
			fileName, url
		}
	}

	return {
		fileName: ProductConfig.IMAGE_PLACEHOLDER_TITLE,
		url: ProductConfig.IMAGE_PLACEHOLDER_URL
	}
}