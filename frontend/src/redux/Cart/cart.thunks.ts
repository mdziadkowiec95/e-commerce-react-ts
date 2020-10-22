import { ProductInCart } from "../../common/types/product";
import CartConfig from "../../config/cart";
import { AppThunk } from "../store";
import { CartActions } from "./cart.reducer";

const saveCartInDB = (products: ProductInCart[]) => {
  localStorage.setItem('cart-db', JSON.stringify(products));
}

const fakeDBCallForCart = (): Promise<ProductInCart[]> => new Promise((resolve, reject) => {
  const data: string | null = localStorage.getItem('cart-db');

  setTimeout(() => {
    resolve(data ? JSON.parse(data) : []);
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

export const resetCartInLocalStorage = () => {
  localStorage.removeItem(CartConfig.CART_ITEMS_LOCAL_STORAGE_KEY);
}
export const addProductToCart = (product: ProductInCart): AppThunk => async (dispatch, getState) => {
  try {
    const isAuth: boolean = getState().user.isAuth;

    dispatch(CartActions.addProductToCart(product));

    if (isAuth) {
      saveCartInDB(getState().cart.products);
    } else {
      saveCartInLocalStorage(getState().cart.products);
    }
  } catch (error) {
    console.error(error);
  }
};

export const loadPersistedCartForGuest = (): AppThunk => async (dispatch, getState) => {
  try {
    const persistedCartData: ProductInCart[] = getCartFromLocalStorage();

    console.log('guest user cart data', persistedCartData);

    dispatch(CartActions.loadPersistedCart(persistedCartData));
  } catch (error) {
    console.error(error);
  }
};


export const loadPersistedCartForAuthUser = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(CartActions.loadPersistedCartForAuthUserBegin());
    const persistedCartDataFromDB: ProductInCart[] = await fakeDBCallForCart();

    console.log('auth user cart data', persistedCartDataFromDB);

    dispatch(CartActions.loadPersistedCartForAuthUserSuccess(persistedCartDataFromDB));

    saveCartInDB(getState().cart.products);
    resetCartInLocalStorage();
  } catch (error) {
    console.error(error);
  }
};

