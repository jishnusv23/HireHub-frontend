import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {  FiKey } from "react-icons/fi";
import { Form, FormField } from "@/components/ui/form";
import FormInputWithIcon from "../FormInuprWithIcon";
import Logo from "@/assets/logos/HireHub-r.png";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { updatePasswordAction } from "@/redux/store/actions/auth/updatePasswordAction";
import { toast } from "sonner";

const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const formSchema = z.object({
  password: z.string().refine((value) => strongPassword.test(value), {
    message:
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
  confirmPassword: z.string(),
});

export const ForgotLoginField = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(
    "🚀 ~ file: ForgotLoginField.tsx:30 ~ ForgotLoginField ~ searchParams:",
    searchParams
  );
  const token = searchParams.get("token");
  console.log(
    "🚀 ~ file: ForgotLoginField.tsx:32 ~ ForgotLoginField ~ token:",
    token
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (!token) {
      console.error("Token is not getting why");
      return;
    }
    const responset = await dispatch(
      updatePasswordAction({ token, password: values.password })
    );
    console.log(
      "🚀 ~ file: ForgotLoginField.tsx:44 ~ onSubmit ~ responset:",
      responset
    );
    if (responset.payload.success) {
      setLoading(false);
      navigate("/");
    } else {
      toast.error("Password Changed failed");
      setLoading(false)
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
        Set your new password
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          />{" "}
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
          <Button
            type="submit"
            className="w-full bg-primary text-white font-bold py-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
          {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
        </form>
      </Form>
    </div>
  );
};
