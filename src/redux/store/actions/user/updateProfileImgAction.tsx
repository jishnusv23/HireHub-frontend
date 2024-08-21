import { config } from "@/common/configuration";
import { userService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const updateProfileImgAction = createAsyncThunk(
  "user/updateProfileImg",
  async (data: { url: string; email: string }, { rejectWithValue }) => {
    console.log("🚀 ~ file: updateProfileImgAction.tsx:10 ~ data:", data)
    // Corrected `emial` to `email`
    try {
      const response = await CLIENT_API.post(
        `${userService}updateImge`, // Make sure the endpoint URL is correct
        data,
        config
      );

      console.log("Response:", response);

      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.log("Update profile image action error: ", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
