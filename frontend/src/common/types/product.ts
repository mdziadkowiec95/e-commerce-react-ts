import { Asset, Entry, EntryCollection } from "contentful";
import { CategoryEntry } from "./categories";

export interface ProductBase {
	productName: string;
	slug: string;
	productDescription: string;
	price: number;
	quantity: number;
	image: Asset[];
	sku: string;
	category: CategoryEntry;
}

export type ProductEntry = Entry<ProductBase>;
export type ProductsCollection = EntryCollection<ProductBase>;

export interface Product extends ProductBase {
	id: string;
}

export interface MappedProductImage { fileName: string, url: string };

export interface ProductInCart {
	id: string;
	image: MappedProductImage;
	slug: string;
	price: number;
	quantity: number;
	productName: string;
}


export interface ProductsCollectionMap {
	limit: number;
	skip: number;
	total: number;
	items: Product[];
}