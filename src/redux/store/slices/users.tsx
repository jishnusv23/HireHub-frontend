import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserData, loginAction } from "../actions/auth";
import {  SignupFormData } from "@/types/IForm";
import { logoutAction } from "../actions/auth/logoutAction";
import { OtpverficationAction } from "../actions/auth/OtpverificationAction";
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
    makeErrorDisable:(state)=>{
      state.error=null
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(signupAction.pending, (state: UserState) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(
      //   signupAction.fulfilled,
      //   (state: UserState, action: PayloadAction<SignupFormData>) => {
      //     state.loading = false;
      //     state.data = action.payload;
      //     state.error = null;
      //   }
      // )
      // .addCase(signupAction.rejected, (state: UserState, action) => {
      //   (state.loading = false),
      //     (state.error = action.error.message || "Signup Failed");
      //   state.data = null;
      // })

      //*get user data
      .addCase(getUserData.pending, (state: UserState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserData.fulfilled,
        (state: UserState, action: PayloadAction<SignupFormData>) => {
          // console.log("herer reached", action.payload);

          state.loading = false;
          state.data = action.payload;
          state.error = null;
          // console.log(action.payload, "-ioioioioi--");
        }
      )
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        if (typeof action.error.message === "string") {
          state.error = action.error.message;
        } else {
          state.error = "Failed to load user data";
        }
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
      .addCase(logoutAction.fulfilled, (state: UserState) => {
        (state.loading = false), (state.data = null);
        state.error = null;
      })
      //*otp verification after

      .addCase(OtpverficationAction.pending, (state: UserState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(OtpverficationAction.fulfilled, (state: UserState, action) => {
        (state.loading = false),
          (state.data = action?.payload),
          (state.error = null);
      })
      .addCase(OtpverficationAction.rejected, (state: UserState, action) => {
        console.log("rejected");
        state.loading = false;
        state.data = null;
        state.error = action.error?.message || "login failed";
      });
  },
});

export const { storeUserData,makeErrorDisable } = userSlice.actions;
export const userReducer = userSlice.reducer;
