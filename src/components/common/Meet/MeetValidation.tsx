import React, { useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FiUser, FiMail, FiKey } from "react-icons/fi";
import FormInputWithIcon from "../FormInuprWithIcon";
import { Button, CircularProgress } from "@mui/material";

// Form validation schema using Zod
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username max is 30 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(2, { message: "Email must be at least 2 characters." }),
  uniqueId: z
    .string()
    .min(5, { message: "Unique ID must be at least 5 characters." }),
});

interface MeetValidationProps {
  RoomID: string;
  onSubmit: (formData: { username: string; email: string }) => void;
}

export const MeetValidation: React.FC<MeetValidationProps> = ({
  RoomID,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      uniqueId: RoomID || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      onSubmit({ username: values.username, email: values.email });
      console.log("Form submitted with values:", values);
    } catch (error) {
      console.error("Failed to join the meeting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <>
                  <FormInputWithIcon
                    field={field}
                    icon={<FiUser />}
                    placeholder="Your Username"
                    showTitle={false}
                  />
                  {fieldState.error && (
                    <p className="text-red-600">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <>
                  <FormInputWithIcon
                    field={field}
                    icon={<FiMail />}
                    placeholder="Your Email"
                    showTitle={false}
                  />
                  {fieldState.error && (
                    <p className="text-red-600">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />

            <FormField
              control={form.control}
              name="uniqueId"
              render={({ field, fieldState }) => (
                <>
                  <FormInputWithIcon
                    field={field}
                    icon={<FiKey />}
                    placeholder="Meeting ID"
                    showTitle={false}
                  />
                  {fieldState.error && (
                    <p className="text-red-600">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? "Joining..." : "Join Meeting"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
