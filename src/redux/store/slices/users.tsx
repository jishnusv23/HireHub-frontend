import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signupAction } from "../actions/auth/signupAction";
import { getUserData, loginAction } from "../actions/auth";
import { SignupFormData } from "@/types/IForm";

export interface UserState {
  loading: boolean;
  data: SignupFormData | null;
  error: string | null;
}
const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    storeUserData: (
      state: UserState,
      action: PayloadAction<SignupFormData>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { storeUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
