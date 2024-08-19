import React from "react";

interface ToolTipWrapperProps {
  title: string;
  children: React.ReactNode;
}

const ToolTipWrapper: React.FC<ToolTipWrapperProps> = ({ title, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {title}
      </div>
    </div>
  );
};

export default ToolTipWrapper;
