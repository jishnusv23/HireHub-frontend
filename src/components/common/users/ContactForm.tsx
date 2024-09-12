import { Form, FormField } from "@/components/ui/form";
// import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import IMg from "@/assets/home/Legal-3.webp";
import { Player } from "@lottiefiles/react-lottie-player";
import FormInputCustom from "@/components/ui/FormInputCustoms";
import RadioButtonsGroup from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  Firstname: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, { message: "Username max is 30 characters" }),
  Secondname: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, { message: "Username max is 30 characters" }),
  message: z
    .string()
    .min(2, {
      message: "Message must be at least 2 characters.",
    })
    .max(30, { message: "Message max is 30 characters" }),
  email: z
    .string()
    .email()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Email max is 30 characters" }),
});

export const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Firstname: "",
      Secondname: "",
      email: "",
      message: "",
    },
  });

  const onsubmit = async () => {
    // console.log("Form submitted");
   toast.success("Thank you! We'll get back to you shortly.");

    form.reset()
  };

  return (
    <>
      <div className="text-center">
        {/* <img src={IMg} alt="Contact Us" className="w-60 h-50 mx-auto" /> */}
        <Player
          src=" https://lottie.host/e88840e6-7d41-40b5-9a29-5eea550793e5/QCiFozjouQ.json"
          background="transparent"
          speed={1}
          loop
          autoplay
          className="w-80 mx-auto"
        />
        <h1 className="font-semibold text-foregroundAccent text-4xl mt-5">
          Contact us
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="Firstname"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Your Firstname"
                  showTitle={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="Secondname"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Your Secondname"
                  showTitle={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Email"
                  showTitle={false}
                />
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Message"
                  showTitle={false}
                />
              )}
            />
          </div>

          {/* Radio Group */}
          <div className="mt-4">
            <h1 className="font-semibold"> What Interview do you need?</h1>
            <RadioButtonsGroup />
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <Button type="submit" className="w-60  p-3 rounded-md">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
