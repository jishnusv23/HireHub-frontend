import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import OutPut from "./OutPut";
import LanguageSelector from "./LanguageSelector";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const [showOutput, setShowOutput] = useState(false);

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleRunClick = () => {
    setShowOutput(true);
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
            onMount={onMount}
          />
        </div>

        {showOutput && (
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gray-900 p-4 transition-all duration-300">
            <OutPut
              editorRef={editorRef}
              language={language}
              setShowOutput={setShowOutput}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
