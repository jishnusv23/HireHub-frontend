import React, { useContext, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import OutPut from "./OutPut";
import LanguageSelector from "./LanguageSelector";
import { SocketContext } from "@/context/SocketProvider";
import { debounce } from "lodash";
import { DefaultShowing } from "@/utils/ws/DefaultPrint";
interface CodeEditorProps {
  roomId: string;
  setIsOpenTerminal: (isClose: boolean) => void;
}
type Language = keyof typeof DefaultShowing;

const CodeEditor: React.FC<CodeEditorProps> = ({
  roomId,
  setIsOpenTerminal,
}) => {
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
    setShowOutput((prev) => {
      const newState = !prev; 
      socket?.emit("open-outputBox", { roomId, showOutput: newState });
      return newState; 
    });
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
      socket?.on("outputBox-open", (isOPen) => {
        console.log("output box open for each users ", isOPen);
        setShowOutput(isOPen);
      });

      socket.on("setup-selected-language",(selectedlanguage)=>{
        setLanguage(selectedlanguage);
      });

      return () => {
        socket?.off("update-code");
        socket?.off("outputBox-open");
      };
    }
  }, [socket]);
  useEffect(()=>{
    socket?.emit('select-language',{language,roomId})
  },[language,setLanguage])
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
  const handleTerminalClose = () => {
    setIsOpenTerminal(false);
  };

  return (
    <div className="relative h-screen">
      <div className="flex justify-between  mb-4 bg-white">
        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
          setContent={setContent}
        />
        <div className="flex justify-between gap-4">
          <Button
            className="bg-green-700 hover:bg-green-900"
            onClick={handleRunClick}
          >
            Run
          </Button>
          <Button
            className="bg-red-700 hover:bg-red-900"
            onClick={handleTerminalClose}
          >
            close
          </Button>
        </div>
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
              setShowOutput={handleRunClick}
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
