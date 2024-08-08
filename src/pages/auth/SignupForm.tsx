import { Form, FormField } from "../../components/ui/form";
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from "../../components/ui/button";
import * as z from 'zod'
import {useForm} from 'react-hook-form'

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

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            username:"",
            email:"",
            password:"",
            confirmpassword:""
        }
    })

    async function onsubmit(values:z.infer<typeof formSchema>){
        console.log("first")
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
      </form>
    </Form>
  );
};

export default SignupForm;
