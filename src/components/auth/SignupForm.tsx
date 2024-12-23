import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FiUser, FiMail, FiKey } from "react-icons/fi";
import FormInputWithIcon from "@/components/common/FormInuprWithIcon";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/hooks";
import { toast } from "sonner";
import { findEmailAction } from "@/redux/store/actions/auth/findEmailAction";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendVerificationMail } from "@/redux/store/actions/auth/Verification";
const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, { message: "Username max is 30 characters" }),
    email: z
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onsubmit(values: z.infer<typeof formSchema>) {
    const allData = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmpassword: values.confirmPassword,
    };
    setLoading(true);
    // console.log(allData)
    const result = await dispatch(findEmailAction(allData.email));
    console.log("🚀 ~ file: SignupForm.tsx:72 ~ onsubmit ~ result:", result)

    if (!result.payload || !result.payload.success) {
      toast.error(result?.payload?.message);
      
      setLoading(false);
      return;
    }

    // const response = await dispatch(signupAction(allData));
    // console.log("🚀 ~ file: SignupForm.tsx:83 ~ onsubmit ~ response:", response)

    // if (response.payload && response.payload.success) {
      // console.log(
      //   "🚀 ~ file: SignupForm.tsx:79 ~ onsubmit ~ response:",
      //   response
      // );
      // dispatch(storeUserData(response.payload.data));
      // console.log(response.payload.data.email);
      dispatch(sendVerificationMail(values.email));
      setLoading(false);
      navigate("/otp-verification", {
        state: { data:allData },
      });
    // }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<FiUser />}
              placeholder="Your Username"
              showTitle={false}
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<FiMail />}
              placeholder="Your Email"
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
              placeholder="Your Password"
              type="password"
              showTitle={false}
            />
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<FiKey />}
              placeholder="Again password"
              type="password"
              showTitle={false}
            />
          )}
        />

        <Button type="submit" className="w-full">
          {loading ? "loading" : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
