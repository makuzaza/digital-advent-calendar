import Calendars from "./Calendars";
import { useState } from "react";

const Favourite: React.FC = () => {

    const [search, setSearch] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };

    return (
      <div className="home calendars">
        <Calendars search={search} setSearch={setSearch} handleSearch={handleSearch}/>
      </div>
    );
  };
  
  export default Favourite;