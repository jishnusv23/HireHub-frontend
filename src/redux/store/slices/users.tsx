import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signupAction } from "../actions/auth/signupAction";
import { getUserData, loginAction } from "../actions/auth";
import { LoginFormData, SignupFormData } from "@/types/IForm";
import { logoutAction } from "../actions/auth/logoutAction";

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
  extraReducers: (builder) => {
    builder
      .addCase(signupAction.pending, (state: UserState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signupAction.fulfilled,
        (state: UserState, action: PayloadAction<SignupFormData>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(signupAction.rejected, (state: UserState, action) => {
        (state.loading = false),
          (state.error = action.error.message || "Signup Failed");
        state.data = null;
      })

      //*get user data
      .addCase(getUserData.pending, (state: UserState) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(
        getUserData.fulfilled,
        (state: UserState, action: PayloadAction<SignupFormData>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
          console.log(action.payload, "-ioioioioi--");
        }
      )
      .addCase(getUserData.rejected, (state: UserState) => {
        (state.loading = false), (state.data = null), (state.error = null);
      })
      //*login action
      .addCase(loginAction.pending, (state: UserState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state: UserState, action) => {
        (state.loading = false),
          (state.data = action?.payload),
          (state.error = null);
      })
      .addCase(loginAction.rejected, (state: UserState, action) => {
        console.log("rejected");
        state.loading = false;
        state.data = null;
        state.error = action.error?.message || "login failed";
      })
      //*logout action
      .addCase(logoutAction.pending, (state: UserState) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(logoutAction.rejected, (state: UserState, action) => {
        (state.loading = false), (state.data = null);
        state.error = action.error.message || "Logout Failed";
      })
      .addCase(logoutAction.fulfilled, (state: UserState, action) => {
        (state.loading = false), (state.data = null);
        state.error = null;
      });
  },
});

export const { storeUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
