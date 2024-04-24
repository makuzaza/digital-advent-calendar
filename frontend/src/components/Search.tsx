type SearchProps = {
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
};

const Search: React.FC<SearchProps> = ({ onchange, search }) => {
  return (
    <div className="search">
      <input onChange={onchange} value={search} placeholder="search..."></input>
    </div>
  );
};

export default Search;
