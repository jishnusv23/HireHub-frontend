import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FiUser, FiKey } from "react-icons/fi";
import { Form, FormField } from "@/components/ui/form";
import FormInputWithIcon from "../FormInuprWithIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { loginAction } from "@/redux/store/actions/auth";
import { RooteState } from "@/redux/store";
import { toast } from "sonner";
import { storeUserData } from "@/redux/store/slices/users";
import { useNavigate } from "react-router-dom";

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
  const userData = useAppSelector((state: RooteState) => state.user);
  const navigate = useNavigate();
  //*dispatch
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values, "login values");
    setLoading(true);

    const response = await dispatch(loginAction(values));

    console.log("🚀 ~ file: LoginForm.tsx:46 ~ onSubmit ~ response:", response);
    if (!response.payload || !response.payload.success) {
      setLoading(false);
      console.log(response?.payload?.message, "kokokoko");
      toast.error(response?.payload?.message);
    } else {
      console.log(response.payload.data.email, "lololololo");
      
      // localStorage.setItem("authToken", JSON.stringify(data));
      dispatch(storeUserData(response.payload.data));
      if (response.payload.data.role === "pending") {
        setLoading(false);
        navigate("/login");
        
      }
    }
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
              title="username"
              showTitle={false}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<FiKey />}
              placeholder="Your password"
              title="password"
              type="password"
              showTitle={false}
            />
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading" : "Login"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};
