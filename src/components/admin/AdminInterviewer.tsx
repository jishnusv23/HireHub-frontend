import React from "react";
import { format } from "date-fns";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { Toaster } from "sonner";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

export const AdminInterviewer: React.FC = () => {
  return (
    <div className="max-w-full mx-auto py-20 px-20">
      {/* <Toaster richColors position="top-center" /> */}
      <h1 className="text-3xl font-bold ml-10 mb-10">Students</h1>

      {/* Search Bar */}
      <div className="flex justify-end items-center">
        <div>{/* <SearchBar onSearchChange={() => {}} /> */}</div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Si.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Sample Row */}
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>{format(new Date(), "dd-MM-yyyy")}</TableCell>
              <TableCell>
                <DoneOutlineIcon color="success" />
              </TableCell>
              <TableCell>
                <button className="btn btn-sm btn-outline btn-primary">
                  Unblock
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {/* <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} /> */}
      </div>
    </div>
  );
};
