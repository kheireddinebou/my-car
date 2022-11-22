import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Car from "./pages/car/Car";
import EditForm from "./pages/editForm/EditForm";
import { ShowEditContext } from "./context/showEditContext copy/showEditContext ";
import { useContext } from "react";

function App() {
  const { showEdit } = useContext(ShowEditContext);

  return (
    <Router>
      {showEdit && <EditForm />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/car/:id" element={<Car />} />
      </Routes>
    </Router>
  );
}

export default App;
