import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { BiSort } from "react-icons/bi";
function OptionsBar({ onSortChange, onOptionPageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("");
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleSortChange = ({ sortOrder }) => {
    onSortChange(sortOrder);
    setIsOpen(false);
  };

  const handleOptionChange = (e) => {
      setActivePage(e.target.innerText);
      onOptionPageChange(activePage);
  };

  const OptionButton = ({ filter, sort }) => {
    return (
      <button
        onClick={() => handleSortChange(sort)}
        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
      >
        {filter}: {sort}
      </button>
    );
  };

  return (
    <div className="flex-col flex">
      <div className="flex items-center justify-between bg-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-center gap-7">
          <button
            onClick={handleOptionChange}
            onFocus={handleOptionChange}
            className="bg-gray-300 focus:bg-gray-500 focus:text-white p-2 font-semibold rounded-2xl"
          >
            Top Rated
          </button>
                  <button
            onFocus={handleOptionChange}
            onClick={handleOptionChange}
            className="bg-gray-300 focus:bg-gray-500 focus:text-white p-2  font-semibold rounded-2xl"
          >
            Popular
          </button>
        </div>
        <div className="flex items-center justify-center gap-4">
          <FiFilter className="w-6 h-6 cursor-pointer hover:text-red-500 duration-300" />
          <BiSort
            onClick={toggleMenu}
            className="w-6 h-6 cursor-pointer hover:text-red-500 duration-300"
          />
        </div>
      </div>
      <div className="flex items-center justify-end mt-2">
        {isOpen && (
          <div className=" bg-white border border-gray-300 rounded shadow-lg">
            <OptionButton
              filter={"Kullanıcı Değerlendirmesi"}
              sort={"Azalan"}
            />
            <OptionButton filter={"Kullanıcı Değerlendirmesi"} sort={"Artan"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OptionsBar;
