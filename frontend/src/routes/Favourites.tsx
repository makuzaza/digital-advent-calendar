import { useState } from "react";
import Favourite from "./Favourite";

const Favourites: React.FC = () => {

  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  
  return (
    <div className="home favourites">
      <Favourite search={search} setSearch={setSearch} handleSearch={handleSearch}/>
    </div>
  );
};

export default Favourites;
