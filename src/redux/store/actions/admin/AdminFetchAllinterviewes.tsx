import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const AdminFetchAllInterivewes=createAsyncThunk(
    'Interivewes-admin',
    async(data:{page?:number|string|null,limit?:number|string|null,},{rejectWithValue})=>{
        try{
             let query = "?";
             if (data?.page) {
               query += `page=${data.page}&`;
             }
             if (data?.limit) {
               query += `limit=${data.limit}&`;
             }
             const response=await CLIENT_API.get(`${interviewService}Admin-Fetch-interivewes${query}`,config)
             if(response.data.success){
                return response.data
             }else{
                return rejectWithValue(response.data)
             }
        }catch(error:any){
            console.error('something wrong in FetchAllInterivewesInAdmin',error);
           
            
        }
    }
)