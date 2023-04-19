import NavBar from "./components/navBar";
import Login from "./layouts/login";
import UserPage from "./components/page/userPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/">
          <Route path=":type?" element={<Login />} />
        </Route>
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
