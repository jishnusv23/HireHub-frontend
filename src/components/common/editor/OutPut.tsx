import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/hooks";
import { SubmissionAction } from "@/redux/store/actions/Editor/SubmissionAction";
import React, { RefObject, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
interface OutpuProps {
  editorRef: RefObject<any>;
  language: string;
  setShowOutput: () => void;
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
  const dispatch = useAppDispatch();
  const [output, setOuput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  console.log("🚀 ~ file: OutPut.tsx:15 ~ editorInstance:", editorInstance);
  console.log(
    editorRef.current.getValue(),
    language,
    code,
    roomId,
    "roomid",
    "__________________________________________________"
  );
  useEffect(() => {
    const codeSubmission = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await dispatch(SubmissionAction({ code, language }));
        console.log(
          "🚀 ~ file: OutPut.tsx:32 ~ codeSubmission ~ response:",
          response
        );
        if (response.payload && response.payload.success) {
          setOuput(response.payload.output);
        } else {
          setError(
            response.payload.error || "An Error occurred during execution"
          );
        }
      } catch (error: any) {
        setError(error?.message || "An Error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    codeSubmission();
  }, [code, dispatch, language]);
  const handleOutputShow = () => {
    setShowOutput();
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
        {/* <p>This is where the output will be displayed.</p> */}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <pre className="whitespace-pre-wrap">{output}</pre>
        )}
      </div>
    </div>
  );
};

export default OutPut;
