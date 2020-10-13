import { ProductInCart } from "../../common/types/product";
import CartConfig from "../../config/cart";
import { AppThunk } from "../store";
import { CartActions } from "./cart.reducer";

const generateDBCartMock = () => {
	return [{
		"id": "3DVqIYj4dOwwcKu6sgqOgg",
		"image": {
			"fileName": "lenovo-yoga.webp",
			"url": "//images.ctfassets.net/hsn03ejlp1oa/37oX9xXtsR34dEpovI9mNh/469e585b74aeee889a1fd9d1abfd3afd/lenovo-yoga.webp"
		},
		"slug": "lenovo-yoga-i7",
		"price": 11,
		"quantity": Math.floor(Math.random() * 15),
		"productName": "Lenevo Yoga 14' - i7"
	},]
}

const fakeDBCallForCart = (): Promise<ProductInCart[]> => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(generateDBCartMock());
	}, 4000);
});


export const saveCartInLocalStorage = (products: ProductInCart[]) => {
	localStorage.setItem(CartConfig.CART_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(products));
}

export const getCartFromLocalStorage = (): ProductInCart[] => {
	const storedCart: string | null = localStorage.getItem(CartConfig.CART_ITEMS_LOCAL_STORAGE_KEY);

	if (storedCart) {
		const parsedCart = JSON.parse(storedCart);

		return parsedCart;
	}

	return [];
}


export const addProductToCart = (product: ProductInCart): AppThunk => async (dispatch, getState) => {
	try {

		dispatch(CartActions.addProductToCart(product));

		// Dispatch save cart in local storage (non-auth)
		saveCartInLocalStorage(getState().cart.products);

		// TODO -> Dispatch save cart in DB (auth) 

	} catch (error) {
		console.error(error);
	}
};

export const loadPersistedCartForGuest = (): AppThunk => async (dispatch, getState) => {
	try {

		const persistedCartData: ProductInCart[] = getCartFromLocalStorage();

		console.log('guest user cart data', persistedCartData);

		dispatch(CartActions.loadPersistedCart(persistedCartData))

		// dispatch(CartActions.addProductToCart(product));

		// saveCartInLocalStorage(getState().cart.products);

		// Dispatch save cart in DB (auth)  or  save cart in local storage (non-auth)

	} catch (error) {
		console.error(error);
	}
};


export const loadPersistedCartForAuthUser = (): AppThunk => async (dispatch, getState) => {
	try {
		const persistedCartData: ProductInCart[] = await fakeDBCallForCart();

		console.log('auth user cart data', persistedCartData);

		dispatch(CartActions.loadPersistedCart(persistedCartData))

		// dispatch(CartActions.addProductToCart(product));

		// saveCartInLocalStorage(getState().cart.products);

		// Dispatch save cart in DB (auth)  or  save cart in local storage (non-auth)

	} catch (error) {
		console.error(error);
	}
};

