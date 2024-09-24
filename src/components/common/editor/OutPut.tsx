import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/hooks";
import { SubmissionAction } from "@/redux/store/actions/Editor/SubmissionAction";
import React, { RefObject, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
interface OutpuProps {
  editorRef: RefObject<any>;
  language: string;
  setShowOutput: (show: boolean) => void;
  code: string;
  roomId: string;
}
const OutPut: React.FC<OutpuProps> = ({
  editorRef,
  language,
  setShowOutput,
  roomId,
  code,
}) => {
  const editorInstance = editorRef.current;
  const dispatch=useAppDispatch()

  console.log("🚀 ~ file: OutPut.tsx:15 ~ editorInstance:", editorInstance);
  console.log(
    editorRef.current.getValue(),
    language,
    code,
    roomId,
    "roomid",
    "__________________________________________________"
  );
  useEffect(()=>{
    const codeSubmission=async()=>{
      const response =await dispatch(SubmissionAction({code,language}))
      console.log("🚀 ~ file: OutPut.tsx:32 ~ codeSubmission ~ response:", response)
    }
    codeSubmission()
  },[ code])
  const handleOutputShow = () => {
    setShowOutput(false);
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-white text-lg">output</h1>
        <Button
          className="bg-red-700 hover:bg-red-900 mb-4"
          onClick={handleOutputShow}
        >
          <IoMdClose />
        </Button>
      </div>

      <div className="text-white">
        <p>This is where the output will be displayed.</p>
      </div>
    </div>
  );
};

export default OutPut;
