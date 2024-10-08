import React, { useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FormInputCustom from "@/components/ui/FormInputCustoms";
import MultipleSelect from "@/components/ui/MultipleSelect";
import { LangauageType } from "@/types/Common";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { AddQuestionsActions } from "@/redux/store/actions/interviewer/AddQuestions";
interface AddQuestionProps {
  setIsModalOpen: (open: boolean) => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(20, { message: "Name max is 20 characters." }),
  questionType: z.string().nonempty({ message: "Interview type is required." }),
  questions: z
    .string()
    .min(10, { message: "Question must be at least 10 characters." })
    .max(200, { message: "Question max is 200 characters." }),
});
const AddQuestions: React.FC<AddQuestionProps> = ({ setIsModalOpen }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useAppSelector((state: RooteState) => state.user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      questions: "",
      questionType: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, "Submitted values in AddQuestions");
    setIsLoading(true);
    try {
      const response = await dispatch(
        AddQuestionsActions({
          name: values.name,
          questionType: values.questionType,
          questions: values.questions,
          userId: data?._id as string,
        })
      )
      setIsModalOpen(false)
    } catch (error: any) {
      console.error("something errror shwoing AddQUestions", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Add New Interview Question</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 md:pl-6"
        >
          {/* Group Name and Question Type on the same row */}
          <div className="flex flex-col lg:flex-row lg:space-x-4 lg:col-span-8">
            <div className="w-full pt-8 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Question Name"
                    field={field}
                    type="text"
                    className="w-full"
                    showTitle={true}
                  />
                )}
              />
            </div>
            <div className="w-full ">
              <FormField
                control={form.control}
                name="questionType"
                render={({ field }) => (
                  <MultipleSelect field={field} options={LangauageType} />
                )}
              />
            </div>
          </div>

          {/* Question field */}
          <div className="lg:col-span-8">
            <FormField
              control={form.control}
              name="questions"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter the question"
                  field={field}
                  type="text"
                  title="Question"
                  className="w-full h-44"
                  showTitle={true}
                />
              )}
            />
          </div>

          {/* Submit button, aligned to the right */}
          <div className="lg:col-span-8 flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-6"
            >
              Submit Question
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddQuestions;
