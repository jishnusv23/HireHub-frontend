import { Button } from "@/components/ui/button";
import React, { RefObject } from "react";
import { IoMdClose } from "react-icons/io";
interface OutpuProps {
  editorRef: RefObject<any>;
  language: string;
  setShowOutput: (show: boolean) => void;
}
const OutPut: React.FC<OutpuProps> = ({
  editorRef,
  language,
  setShowOutput,
}) => {
  console.log(
    editorRef,
    language,
    "__________________________________________________"
  );
  const handleOutputShow=()=>{
    setShowOutput(false)
  }
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-white text-lg" >output</h1>
        <Button className="bg-red-700 hover:bg-red-900 mb-4" onClick={handleOutputShow}>
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
