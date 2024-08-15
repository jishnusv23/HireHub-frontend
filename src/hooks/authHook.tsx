import { useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";

export const useIAuthenticated = () => {


 
    // Check if token exists in localStorage
    const {data}=useAppSelector((state:RooteState)=>state.user)
   

  return  !!data
};

export const useGetUserRole = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  return data?.role || null;
};
