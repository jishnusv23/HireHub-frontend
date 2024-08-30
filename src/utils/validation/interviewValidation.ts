import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
export const meetingSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(30, { message: "Title should be less than 30 characters." }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long." })
    .max(1000, {
      message: "Description should be less than 1000 characters.",
    }),
  interviewType: z
    .string()
    .nonempty({ message: "Interview type is required." }),
  jobPosition: z
    .string()
    .nonempty({ message: "JobPosition type is required." }),
  date: z.string().refine((val) => dayjs(val).isAfter(dayjs()), {
    message: "Date must be today or later.",
  }),
  startTime: z.string().nonempty({ message: "Start time is required." }),
  participants: z
    .array(z.string().email({ message: "Invalid email address." }))
    .min(1, { message: "At least one participant is required." })
    .max(4, { message: "Maximum 4 participants allowed." }),
});
