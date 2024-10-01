import React, { useState } from "react";
import JS from "@/assets/logos/javascript-icon.png";
import PY from "@/assets/logos/Python-logo.png";
import { Button } from "@/components/ui/button";
import { Player } from "@lottiefiles/react-lottie-player";

interface Question {
  _id: string;
  name: string;
  questions: string;
  questionType: string;
}

interface TechQuestionProps {
  questions: Question[];
  handleOpenModal: () => void;
}

const TechQuestion: React.FC<TechQuestionProps> = ({
  questions,
  handleOpenModal,
}) => {
  const [copiedQuestion, setCopied] = useState<string | null>(null);

  const handleCopy = (question: string) => {
    navigator.clipboard.writeText(question);
    setCopied(question);
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <>
      {questions.length === 0 && (
        <div className="flex items-center justify-center  min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="font-bold text-2xl text-foreground">
              No active questions. Add a new question to get started!
            </h1>
            <Player
              src="https://lottie.host/4551eb86-2c3f-494d-8eb8-d62c50f58ae4/NEnIOLxI55.json"
              background="transparent"
              speed={1}
              loop
              autoplay
              className="w-80 mx-auto"
            />
            <div className="mt-4">
              <Button className="mr-2" onClick={handleOpenModal}>
                Add Now
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {questions.map((data) => (
            <div
              key={data._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col h-full"
            >
              <div className="flex items-center mb-4">
                <img
                  src={
                    data.questionType.toLowerCase() === "javascript" ? JS : PY
                  }
                  alt={`${data.questionType} Logo`}
                  width={30}
                  height={30}
                  className="mr-4"
                />
                <div className="text-white">
                  <h4 className="font-bold text-lg">{data.name}</h4>
                  <p>Type: {data.questionType}</p>
                </div>
              </div>
              <div className="mt-auto">
                <Button
                  onClick={() => handleCopy(data.questions)}
                  className="bg-blue-500 hover:bg-blue-700 text-white w-full"
                >
                  {copiedQuestion === data.questions
                    ? "Copied!"
                    : "Copy Question"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TechQuestion;
