import { config } from "@/common/configuration";
import { userService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateHandClappAction = createAsyncThunk(
  "handclapp-response",
  async(data:{responseHandClap:number,blogId:string},{rejectWithValue})=>{
    try{
        const response = await CLIENT_API.put(
          `${userService}handsClapp`,
          data,
          config
        );
    if (response.data) {
      return response.data;
    } else {
      return rejectWithValue("No data returned");
    }
    }catch(error:any){
         console.error("Error in handClapp", error);

         return rejectWithValue(
           error.response?.data?.message || "An error occurred"
         );
    }
  }
);