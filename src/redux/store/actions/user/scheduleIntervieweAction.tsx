import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const scheduleIntervieweActionAction=createAsyncThunk(
    'interview/schedule',
    async(data:any,{rejectWithValue})=>{
        try{
            console.log(data,'scheduling data')
            const responose=await CLIENT_API.post(`${}`)
        }catch(error:any){

        }
    }
)