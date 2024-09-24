import React, { useContext, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import OutPut from "./OutPut";
import LanguageSelector from "./LanguageSelector";
import { SocketContext } from "@/context/SocketProvider";
import { debounce } from "lodash";
interface CodeEditorProps {
  roomId: string;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ roomId }) => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const [content, setContent] = useState("");
  console.log("🚀 ~ file: CodeEditor.tsx:14 ~ content:", content);

  const [showOutput, setShowOutput] = useState(false);
  const { socket } = useContext(SocketContext) || {};
  const isUpdatingRef = useRef(false);

  const onMountData = (editor: any) => {
    console.log(
      editor,
      "______________________________&&&&&&&&&&&&&&&&&&&&&&&&_________________________________________________"
    );
    editorRef.current = editor;
    editor.focus();
  };

  const handleRunClick = () => {
    setShowOutput(true);
  };
  useEffect(() => {
    if (socket) {
      socket?.on("update-code", (newContent) => {
        console.log(newContent, "________________________________");
        if (editorRef.current) {
          isUpdatingRef.current = true;
          const editor = editorRef.current as any;
          const position = editor.getPosition();
          editor.setValue(newContent);
          editor.setPosition(position);
          setContent(newContent);
          isUpdatingRef.current = false;
        }
      });

      return () => {
        socket?.off("update-code");
      };
    }
  }, [socket]);
  const debouncedEmit = useRef(
    debounce((content: string) => {
      if (!isUpdatingRef.current) {
        socket?.emit("code-change", { roomId, content });
      }
    }, 500)
  ).current;
  const handleEditorChange = (value: string | undefined) => {
    if (value != undefined && !isUpdatingRef.current) {
      setContent(value);
      debouncedEmit(value);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="flex justify-between  mb-4">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <Button
          className="bg-green-700 hover:bg-green-900"
          onClick={handleRunClick}
        >
          Run
        </Button>
      </div>

      <div className="relative h-screen">
        <div
          className={`absolute top-0 left-0 w-full transition-all duration-300 ${
            showOutput ? "h-[40%]" : "h-full"
          }`}
        >
          <Editor
            theme="vs-dark"
            height="100%"
            language={language}
          
            value={content}
            onChange={handleEditorChange}
            onMount={onMountData}
          />
        </div>

        {showOutput && (
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gray-900 p-4 transition-all duration-300">
            <OutPut
              editorRef={editorRef}
              language={language}
              setShowOutput={setShowOutput}
              code={content}
              roomId={roomId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
