import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const SubmissionAction=createAsyncThunk(
    'interivew/submission',
    async(data:{language:string,code:string},{rejectWithValue})=>{
        try{
            const response=await CLIENT_API.post(`${interviewService}code-submission`,data,config)
            console.log("🚀 ~ file: SubmissionAction.tsx:13 ~ async ~ response:", response)
            if(response.data.success){
                return response.data
            }else{
                return rejectWithValue(response.data)
            }

        }catch(error:any){
            console.error('Something wrong in Submission',error.message);
            
        }

})