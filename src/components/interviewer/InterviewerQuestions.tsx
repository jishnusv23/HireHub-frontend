import React, { useEffect, useState } from "react";
import TechQuestion from "../common/Interviewer/TechQuestion";
import { Button } from "../ui/button";
import { CustomModal } from "../customs/CustomModal";
import AddQuestions from "../common/Interviewer/AddQuestions";
import { useAppDispatch } from "@/hooks/hooks";
import Pagination from "../common/Admin/Pagination";
import { getAllQuestionAction } from "@/redux/store/actions/interviewer/getAllQuestionAction";
import { useSelector } from "react-redux";
import { RooteState } from "@/redux/store";
import Loading from "../common/Loading/Loading";

const InterviewerQuestions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RooteState) => state.user);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getallQuestion = async () => {
      try {
        setLoading(true);
        const response = await dispatch(
          getAllQuestionAction({
            userId: data?._id as string,
            page: currentPage,
            limit: itemsPerPage,
          })
        );
        if (response.payload && response.payload.data) {
          setQuestions(response.payload.data.data);
          setTotalPages(response.payload.data.totalPages);
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getallQuestion();
  }, [dispatch, data?._id, currentPage]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {isLoading && <Loading />}
      <div className="flex-grow">
        <div className="flex justify-end pr-5 mb-4">
          <Button onClick={handleOpenModal}>Add</Button>
        </div>
        <TechQuestion questions={questions} />
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Add Question"
        >
          <AddQuestions setIsModalOpen={setIsModalOpen} />
        </CustomModal>
      </div>
      <div className="flex justify-center bg-background">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {/* <div className="mt-auto py-4 bg-backgroundAccent"></div> */}
    </div>
  );
};

export default InterviewerQuestions;
