import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FiUser } from "react-icons/fi";
import { Form, FormField } from "@/components/ui/form";
import FormInputWithIcon from "../FormInuprWithIcon"; // Adjust the import path as necessary
import Logo from "@/assets/logos/HireHub-r.png"; // Adjust the import path as necessary
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { RooteState } from "@/redux/store";
import { toast } from "sonner";
import { storeUserData } from "@/redux/store/slices/users";
import { useNavigate } from "react-router-dom";
import { findEmailAction } from "@/redux/store/actions/auth/findEmailAction";
import { forgotMailAction } from "@/redux/store/actions/auth/forgotMailAction";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Email max is 30 characters" }),
});

export const ForgotField = () => {
  const userData = useAppSelector((state: RooteState) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
async function onSubmit(values: z.infer<typeof formSchema>) {
  setLoading(true);
  console.log(values.email);
  const response = await dispatch(findEmailAction(values.email));
  console.log("🚀 ~ file: ForgotField.tsx:46 ~ onSubmit ~ response:", response);

  if (!response.payload.success) {
    const result = await dispatch(forgotMailAction(values.email));
    console.log("🚀 ~ file: ForgotField.tsx:53 ~ onSubmit ~ result:", result);
    setLoading(false);

    if (result.payload.isBlocked) {
      toast.error("Account Blocked", {
        description:
          "Your account has been blocked by the HireHub team. Please contact support for assistance.",
      });
      return;
    }

    if (result.payload.isGAuth) {
      toast.error("Google Account Detected", {
        description:
          "This account is linked with Google. Please use Google login to proceed.",
      });
      return;
    }

    toast.success("OTP Sent", {
      description: "Please check your email for the one-time password.",
    });
    form.reset()
    
  } else {
    toast.error("Email Not Found", {
      description:
        "The email address you entered does not exist in our records.",
    });
    setLoading(false);
  }
}


  return (
    <div className="p-5 lg:p-16 bg-background rounded-xl flex flex-col gap-4 w-full max-w-lg mx-auto">
      <img
        src={Logo}
        alt="HireHub logo"
        className="mx-auto mb-4"
        width={80}
        height={80}
      />
      <h1 className="text-center text-2xl font-bold mb-6 text-foreground">
        Forgot Password
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<FiUser />}
                placeholder="Enter your email"
                title="username"
                showTitle={false}
              />
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary text-white font-bold py-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </Form>
    </div>
  );
};
