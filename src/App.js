import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [inputVal, setInputVal] = useState("");

  const handleSearch = (searchTerm) => {
    setInputVal(searchTerm);
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <div className="flex w-[90%] flex-row p-3 items-center justify-between mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie searchTerm={inputVal} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
