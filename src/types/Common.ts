export interface dataType{
    page:number|string|null
}

export interface InterviewType {
  _id: string;
  interviewerId: string;
  title: string;
  description: string;
  jobPosition: string;
  date: string;
  interviewStatus: string;
  meetingLink: string;
  startTime: string;
  uniqueId: string;
  interviewerEmail:string
  interviewType: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}
