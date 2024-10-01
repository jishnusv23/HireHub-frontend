import React, { useState } from "react";
import { formatDate } from "../lib/DateExtracting";
import { PiHandsClappingLight } from "react-icons/pi";
import { contentEntities } from "@/types/Common";

import { useAppDispatch } from "@/hooks/hooks";

import { Button } from "../ui/button";
import { CustomModal } from "../customs/CustomModal";

interface Contentprops {
  allBlogs: contentEntities[];
  handleHandClappResponse: (responseHandClap: number, blogId: string) => void;
}

const TipsContent: React.FC<Contentprops> = ({
  allBlogs,
  handleHandClappResponse,
}) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<contentEntities | null>(
    null
  );
  const closeModal = async () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const handleReponse = async (responseHandClap: number, blogId: string) => {
    console.log(
      "🚀 ~ file: TipsContent.tsx:15 ~ handleReponse ~ responseHandClap:",
      responseHandClap + 1
    );
    handleHandClappResponse(responseHandClap, blogId);
  };
  const handleReadOption = (blog: contentEntities) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="pb-10 pl-5">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">
            Career Growth & Opportunities
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {allBlogs.length > 0 ? (
            allBlogs.map((blog) => (
              <div
                key={blog?._id}
                className="md:flex bg-background shadow-lg rounded-lg overflow-hidden"
              >
                <div className="md:w-1/3">
                  <img
                    src={blog.Imgurl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:w-2/3 p-6">
                  <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
                  <h3 className="font-bold text-xl  mb-4 flex items-center">
                    <PiHandsClappingLight
                      className="mr-2 text-xl"
                      onClick={() =>
                        handleReponse(blog.response, blog?._id as string)
                      }
                    />
                    <span className="text-sm">{blog.response}</span>
                  </h3>

                  <p className=" mb-4">
                    <strong>Category:</strong> {blog.tag}
                  </p>

                  <div className="flex justify-start items-center gap-4 ">
                    <p>Published: {formatDate(new Date(blog.date))}</p>
                    <p>•</p>
                    <p>Author: {blog.author}</p>
                  </div>
                  <div className="pt-3">
                    <Button onClick={() => handleReadOption(blog)}>Read</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs available</p>
          )}
        </div>
      </div>
      {selectedBlog && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedBlog.title}
        >
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Content</h3>
            <p>{selectedBlog.content}</p>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default TipsContent;
