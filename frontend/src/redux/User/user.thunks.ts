import { AppDispatch, AppThunk } from "../store";
import { UserActions } from "./user.reducer";
import axios, { AxiosResponse } from 'axios';
import { RegistrationFormValues } from "../../components/RegistrationForm";
import { User } from "../../common/types/user";
import { setAuthTokenHeader } from "../../helpers/setAuthTokenHeader";

export const registerUser = (
	userData: RegistrationFormValues,
	onSuccessCb: () => void
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
	try {
		dispatch(UserActions.registerUserBegin());

		const res: AxiosResponse<{ token: string; }> = await axios.post('/api/users/register', userData);
		const token = res.data.token;

		localStorage.setItem('authToken', token);

		dispatch(UserActions.registerUserSuccess());
		onSuccessCb();
	} catch (error) {
		console.error(error);
		dispatch(UserActions.registerUserError());
	}
};

export const authenticateUser = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
	try {
		dispatch(UserActions.authenticateBegin());

		const res: AxiosResponse<User> = await axios.get('/api/auth');

		const user: User = res.data;

		dispatch(UserActions.authenticateSuccess(user));
	} catch (error) {
		console.error(error);
		dispatch(UserActions.authenticateError());
	}
};

export const signInUser = (email: string, password: string): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
	try {
		dispatch(UserActions.signInBegin());

		const res: AxiosResponse<{ token: string; }> = await axios.post('/api/auth/signin', {
			email,
			password
		});

		const token = res.data.token;
		setAuthTokenHeader(token);
		localStorage.setItem('authToken', token);

		dispatch(UserActions.signInSuccess());
		dispatch(authenticateUser());
	} catch (error) {
		console.error(error);
		dispatch(UserActions.signInError());
	}
};

export const logoutUser = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
	localStorage.removeItem('authToken');

	dispatch(UserActions.logoutUser());
};