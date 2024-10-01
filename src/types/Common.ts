export interface dataType {
  page: number | string | null;
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
  instantMeet: boolean;
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

export const ContentType = [
  "Career Advice",
  "Technical Tips",
  "Industry Trends",
  "Interview Prep",
  "Overcoming Fear",
  "Coding Best Practices",

  "Developer Tools",
  "Feedback",
];



export interface contentEntities {
  _id?:string
  userId?:string;
  title: string;
  author: string;
  date: Date;
  content: string;
  tag: string;
  AdminAccept: boolean;
  response: number;
  Imgurl: string;
}