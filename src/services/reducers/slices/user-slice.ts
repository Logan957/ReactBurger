import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "../../constants/constant";
import { TUserState } from "../../types/reducer-type";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TUser } from "../../types/user-type";
const initialState: TUserState = {
  user: null,

  isUserLoading: false,
  userError:  "",


  isLoginLoading: false,
  loginError:  "",

  isRegisterLoading: false,
  registerError:  "",


  getedCode: false,
  isGetCodeLoading: false,
  getCodeError:  "",

  resetPassword: false,
  isResetPasswordLoading: false,
  resetPasswordError: ""
};

const userSlice = createSlice({
  name: SliceNames.USER,
  initialState: initialState,
  reducers: {

    isUserLoading(state: TUserState) {
      state.isUserLoading = true;
      state.userError = "";
    },
          
    setUser(
      state: TUserState,
      action: PayloadAction<TUser>
    ) {
      state.isUserLoading = false;
      state.user = action.payload;
    },
    
    userError(
      state: TUserState,
      action: PayloadAction<string>
    ) {
      state.isUserLoading = false;
      state.userError = action.payload;
    },


    
    isLoginLoading(state: TUserState) {
      state.isLoginLoading = true;
      state.loginError = "";
    },

          
    setLoginUser(
      state: TUserState,
      action: PayloadAction<TUser>
    ) {
      state.isLoginLoading = false;
      state.user = action.payload;
    },
    
    loginError(
      state: TUserState,
      action: PayloadAction<string>
    ) {
      state.isLoginLoading = false;
      state.loginError = action.payload;
    },


    isRegisterLoading(
      state: TUserState,
    ) {
      state.isRegisterLoading = true;
      state.registerError = "";
    },

        
    setRegisterUser(
      state: TUserState,
      action: PayloadAction<TUser>
    ) {
      state.isRegisterLoading = false;
      state.user = action.payload;
    },


    registerError(state: TUserState,     action: PayloadAction<string>) {
      state.isRegisterLoading = false;
      state.registerError = action.payload;
    },

    isGetCodeLoading(state: TUserState) {
      state.isGetCodeLoading = true;
      state.getCodeError = "";
    },

    getedCode(
      state: TUserState,
      action: PayloadAction<boolean>
    ) {
      state.isGetCodeLoading = false;
      state.getedCode = action.payload;
    },

    getCodeError(
      state: TUserState,
      action: PayloadAction<string>
    ) {
      state.isGetCodeLoading = false;
      state.getCodeError = action.payload;
    },

    resetGetedCode(
      state: TUserState,
    ) {
      state.getedCode = false;
    },

  },
});

export const {
  isGetCodeLoading,
  getedCode,
  getCodeError,
  resetGetedCode,
  isLoginLoading,
  setLoginUser,
  loginError,
  isRegisterLoading,
  setRegisterUser,
  registerError,
  isUserLoading,
  setUser,
  userError
} = userSlice.actions;
export const userReducer = userSlice.reducer;
