import React from "react";
import { RiSearch2Line, RiCloseFill } from "react-icons/ri";

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <>
      <div className="flex xl:w-80 lg:w-80 md:w-60 sm:40 w-40 items-center md:px-4 px-1 bg-slate-100 border-md rounded-sm ">
        <input
          type="text"
          placeholder="Search Notes..."
          className="w-full text-xs bg-transparent py-[11px] outline-none"
          value={value}
          onChange={onChange}
        />
        {value && (
          <RiCloseFill
            className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3"
            onClick={onClearSearch}
          />
        )}

        <RiSearch2Line
          className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3"
          onClick={handleSearch}
        />
      </div>
    </>
  );
};

export default Searchbar;
