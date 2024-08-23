import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const scheduleIntervieweActionAction=createAsyncThunk(
    'interview/schedule',
    async(data:any,{rejectWithValue})=>{
        try{
            console.log(data,'scheduling data')
            const responose=await CLIENT_API.post(`${interviewService}secheduleInterview`,data,config)
            
            console.log("🚀 ~ file: scheduleIntervieweAction.tsx:13 ~ async ~ responose:", responose)
        }catch(error:any){

        }
    }
)