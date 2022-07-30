import React, {useState, createContext, useEffect} from 'react'

export const EditableContext = createContext({})
const IsEditableProvider = ({ children }) => {
    const [isEditable, setIsEditable] = useState(false)
    
  return (
   <EditableContext.Provider value={{isEditable, setIsEditable}}>
    {children}
   </EditableContext.Provider>
  )
}

export default IsEditableProvider