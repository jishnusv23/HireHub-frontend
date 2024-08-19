import React from "react";

interface SearchBarProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  return (
    <div className="p-2">
      <div className="relative w-full">
        <input
          type="text"
          id="search-input"
          className="bg-background border border-gray-300 text-sm rounded-lg focus:outline-none block w-full  p-2.5 t text-primary  "
          placeholder="Search..."
          required
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
};
