export interface dataType{
    page:number|string|null
}

export interface InterviewType {
  _id?: string;
  interviewerId: string;
  title: string;
  description: string;
  jobPosition: string;
  date: string;
  interviewStatus: string;
  meetingLink: string;
  startTime: string;
  uniqueId: string;
  instantMeet:boolean;
  reminded: boolean;
  interviewerEmail: string;
  interviewType: string;
  participants: string[];
  Ongoing: boolean;
  createdAt: string;
  updatedAt: string;
}

export const interviewTypes = [
  "Technical",
  "Behavioral",
  "HR",
  "Coding Challenge",
  "Panel",
  "Case Study",
];
export const LangauageType = ["javascript", "python"];