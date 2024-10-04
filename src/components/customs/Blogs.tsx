import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import TipsContent from "../User/TipsContent";

import ContentAdd from "../common/ContentAdd";
import { CustomModal } from "../customs/CustomModal";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Pagination from "../common/Admin/Pagination";
import { ContentAction } from "@/redux/store/actions/common/ContentAction";
import { contentEntities } from "@/types/Common";
import { RooteState } from "@/redux/store";
import { toast } from "sonner";
import { updateHandClappAction } from "@/redux/store/actions/common/updateHandClappAction";
import Header from "../common/users/Header";
import Footer from "../common/Footer";
import LoadingPopUp from "../common/skeleton/LandingPoup";
import BlogSkeletonLoader from "../common/skeleton/BlogSkeletonLoader";

const Blogs = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [handleClapp, setHandClapp] = useState<number>(0);
  const [allBlogs, setAllBlogs] = useState<contentEntities[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const contentPerPage = 8;

  const closeModal = async () => {
    setIsModalOpen(false);
  };
  const handleAddBlog = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const handlecontent = async () => {
      const response = await dispatch(
        ContentAction({ limit: contentPerPage, page: currentPage })
      );

      if (ContentAction.fulfilled.match(response)) {
        const responseData = response.payload.data;
        setIsLoading(false);
        setAllBlogs(responseData.data);
        setTotalPages(responseData.totalPages);
      }
    };
    handlecontent();
  }, [dispatch, isModalOpen, currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRequest = () => {
    console.log("first");
  };
  const handleHandClappResponse = async (
    responseHandClap: number,
    blogId: string
  ) => {
    try {
      const response = await dispatch(
        updateHandClappAction({
          responseHandClap: responseHandClap + 1,
          blogId,
        })
      );
      console.log(
        "🚀 ~ file: TipsContent.tsx:28 ~ handleReponse ~ response:",
        response
      );

      if (response.payload.success) {
        toast.success("Thanks for your support!");
        const updatedBlogs = allBlogs.map((blog) =>
          blog._id === blogId
            ? { ...blog, response: responseHandClap + 1 }
            : blog
        );
        setAllBlogs(updatedBlogs);
      } else {
        toast.error("Failed to record the clap.");
      }
    } catch (error) {
      console.error("Error in handleReponse:", error);
      toast.error("An error occurred while recording the clap.");
    }
  };
  return (
    <>
      {!data && <Header />}
      {isLoading ? (
        <BlogSkeletonLoader />
      ) : (
        <div className="bg-background pr-10 pt-24">
          <div className="flex justify-end gap-4">
            {data && <Button onClick={handleAddBlog}>AddNew</Button>}
            {data?.role === "admin" && (
              <Button onClick={handleRequest}>Request</Button>
            )}
          </div>
          <TipsContent
            allBlogs={allBlogs}
            handleHandClappResponse={handleHandClappResponse}
          />
          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
      {!data && <Footer />}
    </>
  );
};

export default Blogs;
