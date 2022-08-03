import { createContext, useState } from "react";
export const EditableContext = createContext({});
const IsEditableProvider = ({ children }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [TLoanIDGlobal, setTLoanIDGlobal] = useState(null);

  return (
    <EditableContext.Provider
      value={{ isEditable, setIsEditable, TLoanIDGlobal, setTLoanIDGlobal }}
    >
      {children}
    </EditableContext.Provider>
  );
};

export default IsEditableProvider;
