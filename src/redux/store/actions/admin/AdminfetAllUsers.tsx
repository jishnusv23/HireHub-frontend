import { config } from "@/common/configuration";
import { userService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const AdminFetchAllUsersAction=createAsyncThunk(
    'adminusers',
    async(id:string,{rejectWithValue}) => {
        console.log("🚀 ~ file: AdminfetAllUsers.tsx:10 ~ async ~ id:", id)
   
        try{
            console.log(
              "Request URL:",
              `${userService}fetch-users-admin/${id}`
            );

            const response = await CLIENT_API.get(
              `${userService}fetch-users-admin/${id}`,
              config
            );
            console.log("🚀 ~ file: AdminfetAllUsers.tsx:22 ~ async ~ response:", response)
            if(response.data.success){
                return response.data
            }else{
                return rejectWithValue(response.data)
            }
        }catch(error:any){
            console.error('Something wrong in usersFetchadmin',error);
            
            return rejectWithValue(error.response.data);
        }
    }
)