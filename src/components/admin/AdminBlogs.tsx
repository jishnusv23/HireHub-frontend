import React from "react";
import AddBlogsAdmin from "../common/Admin/AddBlogsAdmin";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const AdminBlogs = () => {
  const navigate = useNavigate();
  const handleAddBlog = () => {
    navigate("/admin/blogs/addcontent");
  };
  return (
    <div className="bg-background pr-10">
      <div className="flex justify-end">
        <Button onClick={handleAddBlog}>AddNew</Button>
        {/* <AddBlogsAdmin /> */}
      </div>
    </div>
  );
};

export default AdminBlogs;
