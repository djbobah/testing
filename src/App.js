import Login from "./layouts/login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route path=":type?" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
