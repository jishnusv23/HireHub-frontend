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
import { useLocation, useNavigate } from "react-router-dom";
import { InterviewModal } from "./InterviewModal";
import { SuccessPage } from "../common/Interviewer/SuccessPage";
import Loading from "../common/Loading/Loading";
import { InterviewType, interviewTypes } from "@/types/Common";
import { meetingSchema } from "@/utils/validation/interviewValidation";
import { updateInterview } from "@/redux/store/actions/interviewer/updateInterviewer";
import { CustomModal } from "../customs/CustomModal";

interface MeetDataProps {
  MeetData?: InterviewType | null;
}

export const InterviewScheduleForm: React.FC<MeetDataProps> = ({
  MeetData,
}) => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responsePayload, setResponsePayload] = useState<any>(null);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: MeetData?.title || "",
      description: MeetData?.description || "",
      interviewType: MeetData?.interviewType || "",
      jobPosition: MeetData?.jobPosition || "",
      date: MeetData?.date || "",
      startTime: MeetData?.startTime || "",
      participants: MeetData?.participants || [],
    },
  });

  const onClose = async () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: z.infer<typeof meetingSchema>) => {
    setLoading(true);
    const interviewData = {
      ...values,
      interviewerId: data?._id,
      interviewerEmail: data?.email,
    };
    let response;
    if (MeetData && MeetData._id) {
      response = await dispatch(
        updateInterview({ data: interviewData, id: MeetData._id })
      );
      if (updateInterview.fulfilled.match(response)) {
        setLoading(false);
        console.log(
          "🚀 ~ file: InterVieweScheduleForm.tsx:67 ~ onSubmit Edit ~ response:",
          response
        );
        setResponsePayload(response.payload.data.data);
        setIsModalOpen(true);
      } else {
        setLoading(false);
        toast.error("Update interview Fail");
      }
    } else {
      response = await dispatch(scheduleIntervieweActionAction(interviewData));
      if (scheduleIntervieweActionAction.fulfilled.match(response)) {
        setLoading(false);
        setResponsePayload(response.payload.data.data);
        setIsModalOpen(true);
      } else {
        setLoading(false);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full md:pl-6 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-8 md:pl-6"
          >
            <div className="space-y-6 col-span-1 lg:col-span-2 ">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter meeting title"
                    field={field}
                    showTitle={true}
                    title="Meeting Title"
                    className="w-full h-12 "
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

            <div className="space-y-6 col-span-1 md:col-span-2 lg:col-span-3 pt-8">
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

            <div className="space-y-6 col-span-1 md:col-span-2 lg:col-span-3">
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

            <div className="col-span-1 md:col-span-2 lg:col-span-8 flex justify-end">
              <Button
                type="submit"
                className="bg-primary text-white font-bold py-2 px-4"
                disabled={loading}
              >
                {MeetData ? "Update Meeting" : "Create Meeting"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={onClose}
        title=" Your Interview Scheduled Successfully💡"
      >
        <SuccessPage response={responsePayload} InstantMeet={false} />
      </CustomModal>
    </>
  );
};
