import NavBar from "./components/navBar";
import Login from "./layouts/login";
import UserPage from "./components/page/userPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/sideBar";
import Home from "./components/home";
import UsersList from "./components/usersList";
import TestsList from "./components/testsList";
import Reports from "./components/reports";
import Main from "./components/main";

function App() {
  return (
    // <BrowserRouter>
    // <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path=":type?" element={<Login />} />
      </Route>
      <Route exact path="/main/*" element={<Main />} />
      {/* <div className="w-auto">
        <SideBar />
      </div> */}
      {/* <div className="col"> */}
      {/* <Route path="/user" element={<UserPage />} /> */}
      {/* <Route
            path="/home"
            element={
              <>
                <NavBar />
                <Home />
              </>
            }
          /> */}
      {/* <Route exact path="/users" element={<UsersList />} />
          <Route exact path="/tests" element={<TestsList />} />
          <Route exact path="/reports" element={<Reports />} /> */}
      {/* </div>
      </div> */}
    </Routes>
    // </BrowserRouter>
  );
}

export default App;
