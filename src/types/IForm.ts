enum Role{
  pending='pending',
  interviewer='interviewer',
  interviewee='interviewee',
  admin='admin'
}
interface Profile{
  avatar:string
}
export interface SignupFormData {
  _id?: string;
  username?: string;

  email?:string,
  password?:string
  role:Role
  isBlocked?:false,
  isVerified?:boolean,
  

  profile?:Profile,
  
}

export interface LoginFormData{
  email:string,
  password:string
}