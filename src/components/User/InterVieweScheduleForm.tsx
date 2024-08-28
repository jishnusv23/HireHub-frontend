import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FormInputCustom from "../ui/FormInputCustoms";
import BasicDatePicker from "../ui/DatePicket";
import MultipleSelect from "../ui/MultipleSelect";
import InputTagComp from "../ui/InputTagComp";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { scheduleIntervieweActionAction } from "@/redux/store/actions/user/scheduleIntervieweAction";
import { RooteState } from "@/redux/store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { InterviewModal } from "./InterviewModal";
import { SuccessPage } from "../common/Interviewer/SuccessPage";
import { getUserData } from "@/redux/store/actions/auth";

const meetingSchema = z.object({
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

const interviewTypes = [
  "Technical",
  "Behavioral",
  "HR",
  "Coding Challenge",
  "Panel",
  "Case Study",
];

export const InterviewScheduleForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responsePayload, setResponsePayload] = useState<any>(null);
  console.log(
    "🚀 ~ file: InterVieweScheduleForm.tsx:59 ~ InterviewScheduleForm ~ responsePayload:",
    responsePayload
  );
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: "",
      description: "",
      interviewType: "",
      jobPosition: "",
      date: "",
      startTime: "",
      participants: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof meetingSchema>) => {
    const interviewData = {
      ...values,
      interviewerId: data?._id,
    };

    const response = await dispatch(
      scheduleIntervieweActionAction(interviewData)
    );

    if (scheduleIntervieweActionAction.fulfilled.match(response)) {
      console.log(response.payload.data.data, "oooooo");
      setResponsePayload(response.payload.data.data);
      setIsModalOpen(true);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-8 gap-6"
          >
            <div className="space-y-6 col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter meeting title"
                    field={field}
                    showTitle={true}
                    title="Meeting Title"
                    className="w-full h-12"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="jobPosition"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Soft Engin, Project Man, or Data Analy"
                    field={field}
                    showTitle={true}
                    title="Job Position"
                    className="w-full h-12"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormInputCustom
                    field={field}
                    showTitle={true}
                    title="Start Time"
                    type="time"
                    placeholder="Select start time"
                    className="w-full h-12"
                  />
                )}
              />
            </div>

            <div className="space-y-6 col-span-3 pt-8">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <BasicDatePicker
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.format("YYYY-MM-DD") : "")
                    }
                    minDate={dayjs()}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="participants"
                render={({ field }) => (
                  <InputTagComp
                    value={field.value}
                    onChange={(email) => field.onChange(email)}
                  />
                )}
              />
            </div>

            <div className="space-y-6 col-span-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter description"
                    field={field}
                    showTitle={true}
                    title="Description"
                    className="w-full h-14"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="interviewType"
                render={({ field }) => (
                  <MultipleSelect field={field} options={interviewTypes} />
                )}
              />
            </div>

            <div className="col-span-8 flex justify-end">
              <Button
                type="submit"
                className="bg-primary text-white font-bold py-2 px-4"
              >
                Create Link
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <InterviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=" Your Interview Scheduled Successfully💡"
      >
        <SuccessPage response={responsePayload} />
      </InterviewModal>
    </>
  );
};
