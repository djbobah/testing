import NavBar from "./components/navBar";
import Login from "./layouts/login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/">
          <Route path=":type?" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
