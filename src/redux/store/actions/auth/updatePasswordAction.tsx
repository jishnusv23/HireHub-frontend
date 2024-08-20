import { CLIENT_API } from "@/utils/axios";
import { config } from "@/common/configuration";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authservice } from "@/common/services/services";

export const updatePasswordAction = createAsyncThunk(
  "user/passwordUpdate",
  async (data: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post(
        `${authservice}updatePassword`,
        data,
        config
      );

      console.log(
        "🚀 ~ file: updatePasswordAction.tsx:13 ~ async ~ response:",
        response
      );
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
        console.log("Something went wrong in getUserData", error);
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);
