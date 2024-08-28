import IMg from "@/assets/home/cartoon-little-boy.jpg";
import { RooteState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/utils/cloudinary/ImageUpload";
import { updateProfileAction } from "@/redux/store/actions/user/updateProfileAction";
import { updateProfileImgAction } from "@/redux/store/actions/user/updateProfileImgAction";
import { toast } from "sonner";
import { storeUserData } from "@/redux/store/slices/users";

export const ProfileImg = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch=useAppDispatch()
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setEditing(false);
      setLoading(true);

      const IMGUrl = await ImageUpload(selectedFile);
      console.log(
        "🚀 ~ file: ProfileImg.tsx ~ handleImageChange ~ IMGUrl:",
        IMGUrl
      );
      if (IMGUrl) {
        setLoading(false);
        const response=await dispatch(updateProfileImgAction({email:data?.email as string ,url:IMGUrl}))
        console.log("🚀 ~ file: ProfileImg.tsx:33 ~ ProfileImg ~ response:", response)
        if(updateProfileImgAction.fulfilled.match(response)){
          dispatch(storeUserData(response.payload.data))
          toast.success(response.payload.message)
        }else{
          toast.error('Profile Imge updation failed')
        }
      }
    }
  };

  const startEditing = () => {
    setEditing(true);
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 overflow-hidden rounded-full">
        <img
          src={data?.profile?.avatar}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
        disabled={!isEditing}
      />
      <Button onClick={startEditing} type="button" disabled={loading}>
        {!loading ? "Change Profile" : "Loading"}
      </Button>
    </div>
  );
};