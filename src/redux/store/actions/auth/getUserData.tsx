import { config } from "@/common/configuration";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.get("/api/user/getUser", config);
      if (response.data.success) {
        console.log(response.data, "getuser");
        return response.data.data;
      } else {
        return rejectWithValue(response.data); // Rejecting with the error message from the server
      }
    } catch (error: any) {
      console.log("Something went wrong in getUserData", error);
      return rejectWithValue(error.response?.data || error.message); // Properly reject with error
    }
  }
);
