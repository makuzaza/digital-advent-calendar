import Calendars from "./Calendars";
import { useState } from "react";

const Favourite: React.FC = () => {

    const [search, setSearch] = useState('');

    return (
      <div className="home calendars">
        <Calendars search={search} setSearch={setSearch}/>
      </div>
    );
  };
  
  export default Favourite;