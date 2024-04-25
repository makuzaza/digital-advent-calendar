import "./Search.css";

type SearchProps = {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
};

const Search: React.FC<SearchProps> = ({ handleSearch, search }) => {
  return (
    <div className="search">
      <input
        onChange={handleSearch}
        value={search}
        placeholder="Search a calendar..."
      ></input>
    </div>
  );
};

export default Search;
