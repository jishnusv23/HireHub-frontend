import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MyContainerComponent: React.FC<Props> = ({ children }) => {
  return (
    <div className="p-5 flex h-screen w-9/12 mx-auto flex-wrap">{children}</div>
  );
};

export default MyContainerComponent;
