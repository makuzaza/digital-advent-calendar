import { Input } from "@mui/material";
import "./Search.css";

type SearchProps = {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
};

const Search: React.FC<SearchProps> = ({ handleSearch, search }) => {
  return (
    <div className="search">
      <Input
        onChange={handleSearch}
        value={search}
        placeholder="Search a calendar..."
        style={{ width: '250px', borderRadius: "5px", padding: "5px", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></Input>
    </div>
  );
};

export default Search;
