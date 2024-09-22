import MultipleSelect from "@/components/ui/MultipleSelect";
import { LangauageType } from "@/types/Common";
import Select from "react-select";
import React from "react";
interface LanguageSelectorProps {
  language: string;
  setLanguage: (value: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  setLanguage,
}) => {
  return (
    <div className="w-32">
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
