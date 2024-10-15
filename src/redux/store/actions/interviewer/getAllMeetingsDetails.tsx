import { CLIENT_API } from "@/utils/axios";
import { config } from "@/common/configuration";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { interviewService } from "@/common/services/services";

export const getAllMeetDetails=createAsyncThunk(
    'interviewer/scheduleDetails',
    async(data:{page?:number|string|null,limit?:number|string|null,search?:string,id:string},{rejectWithValue})=>{
        try{
            let query = "?";
            if (data?.page) {
              query += `page=${data.page}&`;
            }
            if (data?.limit) {
              query += `limit=${data.limit}&`;
            }
            if (data?.search) {
              query += `search=${data.search}&`;
            }
            const response = await CLIENT_API.get(
              `${interviewService}scheduleDetails${query}`,
              config
            );

            // console.log("🚀 ~ file: getAllMeetingsDetails.tsx:23 ~ async ~ response:", response)
            if(response.data){
                return response.data
            }else{
              return rejectWithValue(response.data)
            }

        }catch(error:any){
            console.error('something wrong in interviewDetailsAction',error);
            return rejectWithValue(error)
            
        }
    }
)