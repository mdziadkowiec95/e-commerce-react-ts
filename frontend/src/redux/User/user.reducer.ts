import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../common/types/user';


export interface UserState {
	isLoading: boolean;
	isAuth: boolean;
	user: User | null;
	verification: {
		isVerified: boolean;
		tokenExpired: boolean;
		tokenResend: boolean;
	};
}

const initialState: UserState = {
	isLoading: false,
	isAuth: false,
	user: null,
	verification: {
		isVerified: false,
		tokenExpired: false,
		tokenResend: false,
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		registerUserBegin: state => {
			state.isLoading = true;
		},
		registerUserSuccess: state => {
			state.isLoading = false;
		},
		registerUserError: (state) => {
			state.isLoading = false;
		},
		authenticateBegin: state => {
			state.isLoading = true;
		},
		authenticateSuccess: (state, { payload }: PayloadAction<User>) => {
			state.isAuth = true;
			state.user = payload;
			state.isLoading = false;
		},
		authenticateError: state => {
			state.isLoading = false;
		}
	}
});

// Export actions
export const UserActions = userSlice.actions;
// Export reducer
export default userSlice.reducer;
