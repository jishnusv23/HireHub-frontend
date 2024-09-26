import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const AddQuestionsActions = createAsyncThunk(
  "interviewer/addQuestion",
  async (
    data: {
      name: string;
      questions: string;
      questionType: string;
      userId: string;
    },
    { rejectWithValue }
  ) => {
    console.log("🚀 ~ file: AddQuestions.tsx:10 ~ async ~ data:", data);

    try {
      const response = await CLIENT_API.post(
        `${interviewService}addQuestion`,
        data,
        config
      );
      console.log(
        "🚀 ~ file: AddQuestions.tsx:13 ~ async ~ response:",
        response
      );
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.error("Something showing wrong");
    }
  }
);