import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const updateInterview=createAsyncThunk(
    'interviewer/updateInterviewer',
    async({data,id}:{data:any,id:string},{rejectWithValue})=>{
        try{
            console.log(data,id)
            const response=await CLIENT_API.put(`${interviewService}updateInterview/${id}`,data,config)
            console.log("🚀 ~ file: updateInterviewer.tsx:13 ~ async ~ response:", response)
            if(response.data.success){
               return {
                 data: response.data,
                 status: response.status,
                 statusText: response.statusText,
               };
            }else{
                return rejectWithValue(response.data)
            }
        }catch(error:any){
            console.error('Something wrong in updateintervieweAction',error);
            const e:AxiosError=error as AxiosError
            return rejectWithValue(e.response?.data||e.message)
            

        }
    }
)