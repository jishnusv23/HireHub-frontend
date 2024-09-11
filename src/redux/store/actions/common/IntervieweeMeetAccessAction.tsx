import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const InterivieweeMeetAcess = createAsyncThunk(
  "interview/interveiweevalidation",
  async (data: { uniqueId :string,email:string}, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.get(
        `${interviewService}/isStartingInterview`, {
        params: {
          uniqueId: data.uniqueId,
          email: data.email
        },
        ...config
      },
      
      );
      //   console.log(
      //     "🚀 ~ file: IntervieweeMeetAccessAction.tsx:12 ~ async ~ response:",
      //     response
      //   )
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.error("something wrong in verifystartinterview", error);
      return rejectWithValue(error);
    }
  }
);
