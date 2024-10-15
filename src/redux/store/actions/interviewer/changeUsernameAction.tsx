import { config } from "@/common/configuration";
import { userService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const ChangeUsernameAction=createAsyncThunk(
    'user/username-change',
    async(name:string,{rejectWithValue}) => {
        // console.log("🚀 ~ file: changeUsernameAction.tsx:10 ~ async ~ name:", name)
      
        try{
            const response=await CLIENT_API.put(`${userService}user-name-change`,{name},config)
            if(response.data.success){
                return response.data
            }else{
                return rejectWithValue(response.data)
            }
        }catch(error:any){
            console.error('Something wrong in change the username',);
            
        }
    }
)