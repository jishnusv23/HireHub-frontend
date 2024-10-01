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

import ConfirmModal from "../common/users/ConfirmModal";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getAllContentRequestAction } from "@/redux/store/actions/common/getAllContentRequsestAction";
import { contentEntities } from "@/types/Common";
import { Contentacceptance } from "@/redux/store/actions/common/ContentacceptanceAction";
export const AdminContentRequest: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentRequest, setContentRequest] = useState<contentEntities[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedcontent, setSelectedContent] = useState<{
    id: string;
    AdminAccept: boolean;
  } | null>(null);
  const contentPerPage = 5;
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const resultAction = await dispatch(
          getAllContentRequestAction({
            page: currentPage,
            limit: contentPerPage, 
          })
        );
        if (getAllContentRequestAction.fulfilled.match(resultAction)) {
          const responseData = resultAction.payload.data;
          setContentRequest(responseData.data);
          setTotalPages(responseData.totalPages);
        } else {
          toast.error("Failed to fetch content. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching content data", error);
      }
    };

    fetchContentData();
  }, [dispatch, currentPage]);

  const handleAccept = (contentId: string, AdminAccept: boolean) => {
    setSelectedContent({ id: contentId, AdminAccept });
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedcontent) {
      const response = await dispatch(
        Contentacceptance({
          id: selectedcontent.id,
          AdminAccept: !selectedcontent.AdminAccept,
        })
      );
      if (Contentacceptance.fulfilled.match(response)) {
        setContentRequest((prev) =>
          prev.map((content) =>
            content._id === selectedcontent.id
              ? { ...content, AdminAccept: !selectedcontent.AdminAccept }
              : content
          )
        );
        toast.success(
          `${
            selectedcontent.AdminAccept ? "Blocked" : "Unblocked"
          } content successfully!`
        );
     
        setIsModalOpen(false);
        setSelectedContent(null); 
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedContent(null); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-full mx-auto py-20 px-20 bg-background">
      <Toaster richColors position="top-center" />

      {isModalOpen && (
        <ConfirmModal
          message={`${
            selectedcontent?.AdminAccept ? "block" : "accept"
          } this content?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      <h1 className="text-3xl font-bold ml-10 mb-10 ">Blog Request</h1>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-backgroundAccent">
        <Table>
          <TableHeader>
            <TableRow className="text-xl">
              <TableHead>Si.No</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Accept</TableHead>
              <TableHead>View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contentRequest.map((blog, index) => (
              <TableRow key={blog._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-muted-foreground text-xl font-bold">
                  {blog?.tag}
                </TableCell>
                <TableCell className="text-muted-foreground text-xl font-bold">
                  {format(new Date(blog?.date), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  {blog.AdminAccept ? (
                    <DoneOutlineIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </TableCell>
                <TableCell className="text-xl font-bold">
                  {blog.AdminAccept ? (
                    <Button
                      className="btn btn-outline rounded-2xl bg-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(blog._id as string, blog.AdminAccept);
                      }}
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      className="btn text-sm w-20 btn-outline rounded-2xl bg-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(blog._id as string, blog.AdminAccept);
                      }}
                    >
                      Accept
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

export default AdminContentRequest;
