import NavBar from "./components/navBar";
import Login from "./layouts/login";
import UserPage from "./components/page/userPage";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/sideBar";

function App() {
  return (
    <div className="d-flex">
      <div className="w-auto">
        <NavBar />
        <SideBar />
        {/* <Routes>
          <Route path="/">
            <Route path=":type?" element={<Login />} />
          </Route>
          <Route path="/user" element={<UserPage />} />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;
