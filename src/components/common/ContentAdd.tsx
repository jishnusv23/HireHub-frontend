import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import dayjs from "dayjs";
import * as z from "zod";
import FormInputCustom from "@/components/ui/FormInputCustoms";
import { toast } from "sonner";
import { ImageUpload } from "@/utils/cloudinary/ImageUpload";
import { ContentType } from "@/types/Common";
import MultipleSelect from "@/components/ui/MultipleSelect";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { AddContentAction } from "@/redux/store/actions/common/AddContentAction";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading/Loading";
import { Button } from "../ui/button";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "title must be at least 2 characters." })
    .max(90, { message: "title max is 90 characters." }),
  author: z
    .string()
    .min(2, { message: "Author name must be at least 2 characters." })
    .max(30, { message: "Author name must be max 30 characters." }),
  tag: z
    .string()
    .min(5, { message: "Tag name must be at least 5 characters." }),
  content: z
    .string()
    .min(50, { message: "Content name must be at least 50 characters." }),

  date: z.string().refine((val) => dayjs(val).isAfter(dayjs()), {
    message: "Date must be today or later.",
  }),
});
interface ContentAddProps {
  setIsModalOpen:(isOpen:boolean)=>void
}

const ContentAdd:React.FC<ContentAddProps> = ({setIsModalOpen}) => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [Imgurl, setImgUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      date: "",

      tag: "",
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(
      "🚀 ~ file: AddBlogsAdmin.tsx:41 ~ AddBlogsAdmin ~ values:",
      values,
      Imgurl
    );
    const datas = {
      ...values,
      Imgurl,
    };
    const response = await dispatch(AddContentAction(datas));
    console.log(
      "🚀 ~ file: AddBlogsAdmin.tsx:71 ~ onSubmit ~ response:",
      response
    );
    if (response.payload.success) {
      if(data?.role!=='admin'){
        toast.success('Admin Verify your content')
      }
    setIsModalOpen(false)
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setLoading(true);

      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(previewUrl);

      const IMGUrl = await ImageUpload(selectedFile);
      console.log(
        "🚀 ~ file: AddBlogsAdmin.tsx ~ handleImageChange ~ IMGUrl:",
        IMGUrl
      );
      setImgUrl(IMGUrl);

      setLoading(false);
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-4xl bg-white p-8">
          {/* <h1 className="mb-6 text-2xl font-bold text-center ">Add Blog</h1> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8"
            >
              {/* Title Field */}
              <div className="space-y-6 col-span-1 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormInputCustom
                      placeholder="Enter blog title"
                      field={field}
                      showTitle={true}
                      title="Blog Title"
                      className="w-full h-12"
                    />
                  )}
                />
              </div>

              {/* Author Field */}
              <div className="space-y-6 col-span-1 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormInputCustom
                      placeholder="Enter author name"
                      field={field}
                      showTitle={true}
                      title="Author Name"
                      className="w-full h-12"
                    />
                  )}
                />
              </div>

              {/* Tag Field */}
              <div className="space-y-6 col-span-1 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <MultipleSelect field={field} options={ContentType} />
                  )}
                />
              </div>
              <div className="space-y-6 col-span-1 md:col-span-2 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormInputCustom
                      placeholder="Select date"
                      field={field}
                      showTitle={true}
                      title="Date"
                      type="date"
                      className="w-full h-12"
                    />
                  )}
                />
              </div>

              {/* Content Field */}
              <div className="space-y-6 col-span-1 lg:col-span-8">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <textarea
                      {...field}
                      name="content"
                      placeholder="Enter blog content"
                      className="w-full h-46 p-4 bg-background border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
              </div>
              <div className="space-y-6 col-span-1 lg:col-span-4 ">
                <h1>preview</h1>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-32 mt-4 rounded-md border border-black"
                  />
                )}

                <button
                  type="button"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  onClick={triggerFileSelect}
                >
                  Upload Image
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Date Field (Positioned in the middle left side) */}

              {/* Submit Button */}
              <div className="space-y-6 col-span-full text-center">
                <Button
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  disabled={loading}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ContentAdd;
