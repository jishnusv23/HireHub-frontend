import { config } from "@/common/configuration";
import { userService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const AddContentAction=createAsyncThunk(
    'content-create',
    async(datas:any,{rejectWithValue})=>{
        try{
            const response=await CLIENT_API.post(`${userService}content-create`,datas,config)
            if(response.data.success){
                return response.data
            }else{
                return rejectWithValue(response.data)
            }
        }catch(error:any){
             console.error('something wrong in addcontent',error);
             
        }
    }
)