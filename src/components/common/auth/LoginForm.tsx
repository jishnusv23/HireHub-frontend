import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FiUser, FiKey } from "react-icons/fi";
import { Form, FormField } from "@/components/ui/form";
import FormInputWithIcon from "../FormInuprWithIcon";

const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z.object({
  username: z
    .string()
    .email()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Email max is 30 characters" }),
  password: z.string().refine((value) => strongPassword.test(value), {
    message:
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
});

export const LoginForm = () => {
  const [loading, setloading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<FiUser />}
              placeholder="Your email"
              showTitle={false}
            />
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<FiKey />}
              placeholder="Your Username"
              showTitle={false}
            />
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading" : "Login"}
        </Button>
      </form>
    </Form>
  );
};
