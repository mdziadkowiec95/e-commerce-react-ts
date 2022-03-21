import { Asset } from "contentful";
import { ProductConfig } from "common/config";
import { MappedProductImage } from "common/types";

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