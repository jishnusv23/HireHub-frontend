import { Form, FormField } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser, FiKey, FiUserCheck } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import FormInputWithIcon from "../FormInuprWithIcon";
import { GiPositionMarker } from "react-icons/gi";
import { ProfileImg } from "./ProfileImg";
import { useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(30, { message: "First name should be less than 30 characters." }),
  //   lastName: z
  //     .string()
  //     .min(2, { message: "Last name must be at least 2 characters." })
  //     .max(30, { message: "Last name should be less than 30 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username should be less than 30 characters." }),
  role: z
    .string()
    .min(2, { message: "Role must be at least 2 characters." })
    .max(30, { message: "Role should be less than 30 characters." }),
  profileImageURL: z.string().optional(),
});

export const InterviewerProfileForm = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data?.email || "",
      //   lastName: "",
      username: data?.username || "",
      role: "interviewer",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission logic here, e.g., send data to an API
  }

  return (
    <div className="flex flex-col items-center w-full">
      <ProfileImg />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInputWithIcon
                  field={field}
                  icon={<FiUser />}
                  placeholder="Enter your first name"
                  title="Email"
                  showTitle={true}
                />
              )}
            />
            {/* <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormInputWithIcon
                  field={field}
                  icon={<FiUser />}
                  placeholder="Enter your last name"
                  title="Last Name"
                  showTitle={true}
                />
              )}
            /> */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormInputWithIcon
                  field={field}
                  icon={<FiUserCheck />}
                  placeholder="Enter your username"
                  title="Username"
                  showTitle={true}
                />
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormInputWithIcon
                  field={field}
                  icon={<GiPositionMarker />}
                  placeholder="Enter your role"
                  title="Role"
                  showTitle={true}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-white font-bold py-2"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
