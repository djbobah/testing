import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./components/hooks/useAuth";
// import SideBar from "./components/sideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import Login from "./layouts/login";
import Main from "./components/main";
import NavBar from "./components/navBar";
import MainPage from "./components/mainPage";
import UserPage from "./components/page/userPage";
import DepartmentsProvider from "./components/hooks/useDepartments";
import TestsProvider from "./components/hooks/useTests";
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
        <DepartmentsProvider>
          <TestsProvider>
            <NavBar />
            <Routes>
              <Route path="/">
                <Route path="/" element={<MainPage />} />

                <Route path=":type?" element={<Login />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route exact path="/main/*" element={<Main />} />
                <Route exact path="/users/">
                  <Route path=":idUser?" element={<UserPage />} />
                </Route>
              </Route>
              <Route path="/main/logout" element={<LogOut />} />
            </Routes>
          </TestsProvider>
        </DepartmentsProvider>
      </AuthProvider>
      <ToastContainer />
    </>
    // </BrowserRouter>
  );
}

export default App;
