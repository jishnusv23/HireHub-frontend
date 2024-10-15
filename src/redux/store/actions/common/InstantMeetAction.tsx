import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const InstantMeetAction = createAsyncThunk(
  "interview/InstantMeet",
  async (
    data: { interviewerId: string; interviewerEmail :string},
    { rejectWithValue }
  ) => {
    // instant meet action

    try {
      const response = await CLIENT_API.post(
        `${interviewService}InstantMeet`,
        data,
        config
      );
      // console.log("🚀 ~ file: InstantMeetAction.tsx:20 ~ response:", response)
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.error("Something wrong showing InstantMeetaction", error);
    }
  }
);