import { useState } from "react";

type SearchbarProps = {
  onSearch: (value: string) => void;
};

function Searchbar({ onSearch }: SearchbarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="Searchbar">
      <input
        type="text"
        placeholder="Search for any movie"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Searchbar;