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

function App() {
  return (
    // <BrowserRouter>
    <div className="d-flex">
      {/* <div className="w-auto">
        <SideBar />
      </div> */}
      <div className="col">
        <Routes>
          <Route
            path="/user"
            element={
              <>
                <SideBar />
                <UserPage />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <SideBar />
                <NavBar />
                <Home />
              </>
            }
          />
          <Route
            exact
            path="/users"
            element={
              <>
                <SideBar />
                <UsersList />
              </>
            }
          />
          <Route
            exact
            path="/tests"
            element={
              <>
                <SideBar />
                <TestsList />
              </>
            }
          />
          <Route
            exact
            path="/reports"
            element={
              <>
                <SideBar />
                <Reports />
              </>
            }
          />
          <Route path="/">
            <Route path=":type?" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </div>
    // </BrowserRouter>
  );
}

export default App;
