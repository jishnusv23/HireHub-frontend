enum Role {
  pending = "pending",
  interviewer = "interviewer",
  interviewee = "interviewee",
  admin = "admin",
}
interface Profile {
  avatar: string;
}

export interface Interviewee {
  _id: string;
  username?: string;
  email?: string;
  password?: string;
  role: Role;
  isBlocked: boolean;
  isVerified?: boolean;
  isGAuth?: boolean;
  meetParticipants?:number
  createdAt?: Date | string | undefined;
  profile?: Profile;
}
