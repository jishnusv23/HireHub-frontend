import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiHome } from "react-icons/ci";
import { IoArrowRedoOutline } from "react-icons/io5";
import { Form, FormField } from "@/components/ui/form";
import * as z from "zod";
import RatingReview from "../customs/RatingReview";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface FeedbackProps{
    onSubmitfeedback:    (formData: { content: string; rating:number }) => void,
    roomId:string
}
const formSchema = z.object({
  content: z.string().min(5, {
    message: "Content must be at least 5 characters.",
  }),
});

const FeedBackForm:React.FC<FeedbackProps> = ({onSubmitfeedback,roomId}) => {
  const [rating, setRating] = useState(0);
  const navigate=useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, rating);
    onSubmitfeedback({content:values.content,rating:rating})
    
  };

  return (
    <div className="">
      <div className="flex-1 items-center">
        <h2 className="text-2xl font-semibold ">Your Feedback</h2>
        <p className="mt-2">Please rate your experience below</p>
      </div>

      <div className="flex justify-center">
        <RatingReview rating={rating} setRating={setRating} /> {`${rating}/ 5`}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Additional Comments
                </label>
                <textarea
                  {...field}
                  placeholder="Please share your thoughts about the session..."
                  className="w-full h-32 p-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            )}
          />
          <div className="flex justify-center">
            <p>OR</p>
          </div>
          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
            >
              Submit Feedback
            </Button>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border border-gray-600"
                onClick={() => navigate("/")}
              >
                <span className="bg-background text-2xl font-bold">
                  <CiHome color="" />
                </span>
                Home
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border border-gray-600"
                onClick={() => navigate(`/Meet-HireHub/${roomId}`)}
              >
                <span className="bg-background text-2xl">
                  <IoArrowRedoOutline />
                </span>
                Rejoin
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FeedBackForm;
