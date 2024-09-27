import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { Toaster } from "sonner";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

import Pagination from "../common/Admin/Pagination";
import { useAppDispatch } from "@/hooks/hooks";
import { getAllInterviewee } from "@/redux/store/actions/user/getAllInterviewee";
import { SearchBar } from "../common/Admin/SearchBar";
import { Interviewee } from "@/types/IInterview";
import ConfirmModal from "../common/users/ConfirmModal";
import { updateProfileAction } from "@/redux/store/actions/user/updateProfileAction";
import { toast } from "sonner";
import { Button } from "../ui/button";
export const AdminInterviewee: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [interviewees, setInterviewees] = useState<Interviewee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterviewee, setSelectedInterviewee] = useState<{
    id: string;
    isBlocked: boolean;
  } | null>(null);
  const intervieweePerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchIntervieweeData = async () => {
      try {
        const resultAction = await dispatch(
          getAllInterviewee({
            page: currentPage,
            limit: intervieweePerPage,
            search: searchQuery,
          })
        )
        if (getAllInterviewee.fulfilled.match(resultAction)) {
          const responseData = resultAction.payload.data;
          setInterviewees(responseData.data);
          setTotalPages(responseData.totalPages);
        } else {
          toast.error("Failed to update. Please try again.");
        }
      } catch (error: any) {
        console.error("Error updating interviewee status", error);

       
        throw new Error(
          "An error occurred while updating the interviewee status."
        );
      }
    };

    fetchIntervieweeData();
  }, [dispatch, currentPage, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleBlock = (intervieweeId: string, isBlocked: boolean) => {
    setSelectedInterviewee({ id: intervieweeId, isBlocked });
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedInterviewee) {
      console.log(selectedInterviewee.isBlocked, "-------------------------");
      const response = await dispatch(
        updateProfileAction({
          id: selectedInterviewee.id,
          isBlocked: !selectedInterviewee.isBlocked,
        })
      );
      console.log(
        "🚀 ~ file: AdminInterviewee.tsx:70 ~ handleConfirm ~ response:",
        response
      );
      if (updateProfileAction.fulfilled.match(response)) {
        setInterviewees((prev) =>
          prev.map((viewee) =>
            viewee._id === selectedInterviewee.id
              ? { ...viewee, isBlocked: !selectedInterviewee.isBlocked }
              : viewee
          )
        );
        toast.success(
          `${
            selectedInterviewee?.isBlocked ? "Unblocked" : "Blocked"
          } interviewee successfully!`
        );
      }
      // Close the modal after confirming the action
      setIsModalOpen(false);
      setSelectedInterviewee(null);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedInterviewee(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-full mx-auto py-20 px-20 bg-background">
      <Toaster richColors position="top-center" />
      

      {isModalOpen && selectedInterviewee && (
        <ConfirmModal
          message={`${
            selectedInterviewee.isBlocked ? "unblock" : "block"
          } this interviewee`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      <h1 className="text-3xl font-bold ml-10 mb-10 ">Interviewee</h1>

      {/* Search Bar */}
      <div className="flex justify-end items-center">
        <div>
          <SearchBar onSearchChange={handleSearch} />
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  bg-backgroundAccent">
        <Table>
          <TableHeader>
            <TableRow className="text-xl">
              <TableHead>Si.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>view</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviewees.map((interviewee, index) => (
              <TableRow key={interviewee._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-muted-foreground text-xl font-bold">
                  {interviewee?.username}
                </TableCell>
                <TableCell className="text-muted-foreground text-xl font-bold">
                  {format(
                    new Date(interviewee?.createdAt as string),
                    "dd-MM-yyyy"
                  )}
                </TableCell>
                <TableCell>
                  {interviewee.isBlocked ? (
                    <CancelIcon color="error" />
                  ) : (
                    <DoneOutlineIcon color="success" />
                  )}
                </TableCell>
                <TableCell className=" text-xl font-bold">
                  {interviewee.isBlocked ? (
                    <Button
                      className="btn  btn-outline rounded-2xl bg-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBlock(interviewee._id, interviewee.isBlocked);
                      }}
                    >
                      Unblock
                    </Button>
                  ) : (
                    <Button
                      className="btn text-sm w-20 btn-outline rounded-2xl bg-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBlock(interviewee._id, interviewee.isBlocked);
                      }}
                    >
                      Block
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Button>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminInterviewee;
