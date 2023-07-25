import React, { useContext, useEffect } from "react";
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
import UsersProvider from "./components/hooks/useUsers";
import TypeOfAnswersProvider from "./components/hooks/useTypeOfAnswers";
import AnswersProvider from "./components/hooks/useAnswers";
import QuestionsProvider from "./components/hooks/useQuestions";
import { useDispatch } from "react-redux";
import { loadDepartments } from "./store/departments";
import { loadTypeOfAnswers } from "./store/typeOfAnswers";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDepartments());
    dispatch(loadTypeOfAnswers());
  }, []);
  return (
    <>
      <AuthProvider>
        {/* <DepartmentsProvider> */}
        <TestsProvider>
          <UsersProvider>
            <QuestionsProvider>
              <AnswersProvider>
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
              </AnswersProvider>
            </QuestionsProvider>
          </UsersProvider>
        </TestsProvider>
        {/* </DepartmentsProvider> */}
      </AuthProvider>
      <ToastContainer />
    </>
    // </BrowserRouter>
  );
}

export default App;
