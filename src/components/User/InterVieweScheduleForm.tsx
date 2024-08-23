import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FormInputCustom from "../ui/FormInputCustoms";
import BasicDatePicker from "../ui/DatePicket";
import MultipleSelect from "../ui/MultipleSelect";

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
  interviewTypes: z
    .string()
    .nonempty({ message: "Interview type is required." }),
  JobPosition: z
    .string()
    .nonempty({ message: "JobPosition type is required." }),
  date: z.string().nonempty({ message: "Date is required." }),
  startTime: z.string().nonempty({ message: "Start time is required." }),
  endTime: z.string().nonempty({ message: "Ending time is required." }),
  participants: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .nonempty({ message: "At least one participant is required." }),
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
  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: "",
      description: "",
      interviewTypes: "",
      JobPosition: "",
      date: "",
      startTime: "",
      endTime: "",
      participants: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof meetingSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-8 gap-6"
        >
          {/* Column 1: Meeting Title, Interview Type, Job Position */}
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
              name="JobPosition"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Soft Engin, Project Man, or Data Analyst"
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

          {/* Column 2: Date, Start Time, End Time */}
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
                />
              )}
            />
            <FormField
              control={form.control}
              name="interviewTypes"
              render={({ field }) => (
                <MultipleSelect field={field}  options={interviewTypes} />
              )}
            />
          </div>

          {/* Column 3: Participants, Description */}
          <div className="space-y-6 col-span-3">
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter participant email"
                  field={field}
                  showTitle={true}
                  title="Participants"
                  className="w-full h-12"
                />
              )}
            />
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
              name="endTime"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  showTitle={true}
                  title="End Time"
                  type="time"
                  placeholder="Select end time"
                  className="w-full h-12"
                />
              )}
            />
          </div>

          {/* Submit Button: Full Width */}
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
  );
};
