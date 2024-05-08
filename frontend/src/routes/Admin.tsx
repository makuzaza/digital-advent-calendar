import { useEffect, useState } from "react";
import Calendars, { Calendar } from "./Calendars";
import axios from "axios";

const Admin: React.FC = () => {
  const [search, setSearch] = useState("");

  const [calendars, setCalendars] = useState<Calendar[]>([]);

  const getCalendars = async () => {
    axios.get("http://localhost:8000/firestore/calendars").then((response) => {
      setCalendars(response.data);
    });
  };

  useEffect(() => {
    getCalendars();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="home">
      <div className="panel-data">
        <h1>All the calendars ({calendars.length})</h1>
      </div>

      <Calendars
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default Admin;
