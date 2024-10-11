import MultipleSelect from "@/components/ui/MultipleSelect";
import { LangauageType } from "@/types/Common";
import { DefaultShowing } from "@/utils/ws/DefaultPrint";

import React, {useEffect } from "react";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (value: string) => void;
  setContent: (value: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  setLanguage,
  setContent,
}) => {
  useEffect(() => {
    if (language == "javascript") {
      setContent(DefaultShowing.javascript);
    } else if (language === "python") {
      setContent(DefaultShowing.python);
    }
  }, [setContent, language]);

  return (
    <div className="w-40 ">
      <div>
        <MultipleSelect
          field={{ value: language, onChange: setLanguage }}
          options={LangauageType}
          heading="language"
        />
        {/* <Select value={language} options={LangauageType} /> */}
      </div>
    </div>
  );
};

export default LanguageSelector;
