
import { ShortProfile } from "../common/Interviewer/ShortProfile";
import { ProfileImg } from "../common/Interviewer/ProfileImg";
export const InterviewerProfile = () => {
  return (
    <div className="grid lg:grid-cols-3 pt-0 bg-background min-h-screen">
      <ProfileImg />
      <div className="bg-background col-span-3 rounded-2xl min-h-[200px] flex items-center justify-center">
        <ShortProfile />
      </div>

      <div className="lg:col-span-3 flex items-center justify-center p-5 lg:p-20"></div>

    </div>
  );
};
