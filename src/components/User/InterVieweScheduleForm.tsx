import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FormInputCustom from "../ui/FormInputCustoms";
import BasicDatePicker from "../ui/DatePicket";

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
  type: z.enum(["offline", "online"], { message: "Invalid meeting type." }),
  location: z.string().optional(),
  date: z.string().nonempty({ message: "Date is required." }),
  startTime: z.string().nonempty({ message: "Start time is required." }),
  endTime: z.string().nonempty({ message: "Ending time is required." }),
  participants: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .nonempty({ message: "At least one participant is required." }),
});

export const InterviewScheduleForm = () => {
  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "online",
      location: "",
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
          className="grid grid-cols-8 gap-4 "
        >
          {/* Column 1: Meeting Title, Type, Location */}
          <div className="space-y-4 col-span-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter meeting title"
                  field={field}
                  showTitle={true}
                  title="Meeting Title"
                />
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter type"
                  field={field}
                  showTitle={true}
                  title="Type"
                  readOnly={true}
                />
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter location"
                  field={field}
                  showTitle={true}
                  title="Location"
                />
              )}
            />
          </div>

          {/* Column 2: Date, Start Time, End Time */}
          <div className="space-y-4 col-span-3 pt-6">
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
              name="startTime"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  showTitle={true}
                  title="Start Time"
                  type="time"
                  placeholder="Select start time"
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
                />
              )}
            />
          </div>

          {/* Column 3: Participants, Description */}
          <div className="space-y-4 col-span-3">
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter participant email"
                  field={field}
                  showTitle={true}
                  title="Participants"
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
                />
              )}
            />
          </div>

          {/* Submit Button: Full Width */}
          <div className="col-span-8 flex justify-end">
            <Button
              type="submit"
              className="bg-primary text-white font-bold py-2"
            >
              Create Link
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
