import React, { useContext } from "react";

import Login from "./layouts/login";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./components/hooks/useAuth";
// import SideBar from "./components/sideBar";
import Main from "./components/main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const QContext = React.createContext();
// const qqq = { name: "name", value: "12345" };

// export const useQContext = () => {
//   return useContext(QContext);
// };
// const QContextProvider = ({ children }) => {
//   return (
//     <QContext.Provider value={qqq}>{console.log(children)}</QContext.Provider>
//   );
// };

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route path=":type?" element={<Login />} />
          </Route>
          <Route exact path="/main/*" element={<Main />} />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </>
    // </BrowserRouter>
  );
}

export default App;
