import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import Logo from "@/assets/logos/HireHub-r.png";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  message: z.string().min(1, "Message is required"),
});
export function FooterForm() {
  // const [message,setMessage]=useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });
  const onSubmit = async() => {
    
    toast.success('Thank you for your response! Our team will review your submission and get back to you soon. ')
    form.reset()
    
   

  };
  return (
    <div className="p-5 lg:p-16 bg-backgroundAccent rounded-xl flex flex-col gap-4">
      <img
        src={Logo}
        alt="HireHubLogo"
        width={40}
        height={40}
        className="mx-auto"
      />
      <h3 className="text-center">Get Started</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>message</FormLabel>
                  <FormControl>
                    <Input
                      type="tex"
                      id="message"
                      placeholder="What you want to say?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
}
