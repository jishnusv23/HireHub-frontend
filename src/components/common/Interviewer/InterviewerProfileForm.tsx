import { Form, FormField } from "@/components/ui/form";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUserCheck, FiUser } from "react-icons/fi";
import { GiPositionMarker } from "react-icons/gi";

import { Button } from "@/components/ui/button";
import FormInputWithIcon from "../FormInuprWithIcon";
import { ProfileImg } from "./ProfileImg";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { ChangeUsernameAction } from "@/redux/store/actions/interviewer/changeUsernameAction";
import { getUserData } from "@/redux/store/actions/auth";
import { toast } from "sonner";


// Define schema for form validation
const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email must be at least 2 characters." })
    .max(30, { message: "Email should be less than 30 characters." }),
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
  const dispatch = useAppDispatch();

  // Get the user data from the store
  const { data } = useAppSelector((state: RooteState) => state.user);

  // Local state for holding the updated username and email
  const [updatedUsername, setUpdatedUsername] = useState(data?.username || "");
  const [updatedEmail, setUpdatedEmail] = useState(data?.email || "");
  const [loading, setLoading] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: updatedEmail,
      username: updatedUsername,
      role: "interviewer",
    },
  });

  // Function to handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await dispatch(ChangeUsernameAction(values.username));

    // Check if the dispatch was successful and update the state with new values
    if (response.meta.requestStatus === "fulfilled") {
      // console.log(response.payload.data.username,'___________________________________');
         toast.success("Profile updated successfully.");
      setUpdatedUsername(response.payload.data.username);
      setUpdatedEmail(response.payload.data.email);
      setLoading(false);
      await dispatch(getUserData())
    }
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
              name="email"
              render={({ field }) => (
                <FormInputWithIcon
                  field={field}
                  icon={<FiUser />}
                  placeholder="Enter your email"
                  title="Email"
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
            {loading ? "loading" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
