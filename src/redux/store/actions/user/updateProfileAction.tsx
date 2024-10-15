import { config } from "@/common/configuration";
import { userService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const updateProfileAction = createAsyncThunk(
  "user/update-status",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.put(
        `${userService}profile-status-update`,
        data,
        config
      );
      // console.log(
      //   "🚀 ~ file: updateProfileAction.tsx:17 ~ response:",
      //   response
      // );
      if (response.data.success) {
        return response.data;
      }
      throw new Error(response.data?.message);
    } catch (error: any) {
      console.log("Something wrong in updateAction");
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
