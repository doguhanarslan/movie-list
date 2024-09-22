import React from "react";
import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
function Header({ onSearch }) {
  const [inputVal, setInputVal] = useState("");
  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };
  const handleInputSubmit = (e) => {
    e.preventDefault();
    onSearch(inputVal);
    navigate(`/movie/?q=${inputVal}`);
  };
  const navigate = useNavigate();

  return (
    <div className="bg-black w-full flex p-2 flex-row text-white items-center justify-between">
      <Link to="/" className="font-bold text-[25px] border-[0.1em] p-2 rounded-xl cursor-pointer">
        <h1 className="rounded-xl">Movies</h1>
      </Link>
      <div className="flex-items-center justify-center">
        <form onSubmit={handleInputSubmit}>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputSubmit(e);
              }
            }}
            onChange={(e) => handleInputChange(e)}
            className="bg-slate-200 border p-2 rounded-md w-[500px]"
            type="text"
            value={inputVal}
          />
        </form>
      </div>
      <div></div>
    </div>
  );
}

export default Header;
