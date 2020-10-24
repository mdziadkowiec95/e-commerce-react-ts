import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'common/types/user';


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

export const turnOnLoading = (state: UserState) => {
  state.isLoading = true;
};

export const turnOffLoading = (state: UserState) => {
  state.isLoading = false;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUserBegin: turnOnLoading,
    registerUserSuccess: turnOffLoading,
    registerUserError: turnOffLoading,
    signInBegin: turnOnLoading,
    signInSuccess: turnOffLoading,
    signInError: turnOffLoading,
    authenticateBegin: turnOnLoading,
    authenticateSuccess: (state, { payload }: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = payload;
      state.isLoading = false;
    },
    authenticateError: state => {
      state.isLoading = false;
    },
    logoutUser: state => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = null;
      state.verification = {
        isVerified: false,
        tokenExpired: false,
        tokenResend: false,
      };
    }
  }
});

// Export actions
export const UserActions = userSlice.actions;
// Export reducer
export default userSlice.reducer;
