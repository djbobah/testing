import React, { useContext, useState, useEffect } from "react";

const EditTestContext = React.createContext();

export const useEditTest = () => {
  return useContext(EditTestContext);
};

const EditTestProvider = ({ children }) => {
  const [edit, setEdit] = useState(false);
  // const [isLoading, setLoading] = useState(true);

  return (
    <EditTestContext.Provider value={{ edit, setEdit }}>
      {children}
      {/* {!isLoading ? children : "Loading..."} */}
    </EditTestContext.Provider>
  );
};

export default EditTestProvider;
