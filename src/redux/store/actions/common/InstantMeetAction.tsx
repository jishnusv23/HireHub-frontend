import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const InstantMeetAction=createAsyncThunk(
    'interview/InstantMeet',
    async(InterviewerId:string,{rejectWithValue}) => {
    // instant meet action
      
        try{
            const response=await CLIENT_API.post(`${interviewService}InstantMeet`,{InterviewerId},config)
            if(response.data){
                return response.data
            }else{
                return rejectWithValue(response.data)
            }
        }catch(error:any){
            console.error('Something wrong showing InstantMeetaction',error);
        
            
        }
    }
)