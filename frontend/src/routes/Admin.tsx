import { useEffect, useState } from "react";
import Calendars, { Calendar } from "./Calendars";
import axios from "axios";

import "./Admin.css";

interface User {
  uid: string;
  displayName: string;
  email: string;
}

const Admin: React.FC = () => {
  const [search, setSearch] = useState("");

  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [users, setUsers] = useState([]);

  const getCalendars = async () => {
    axios
      .get("https://caas-deploy.onrender.com/firestore/calendars")
      .then((response) => {
        console.log("calendars", response.data);
        setCalendars(response.data);
      });
  };

  const getListUsers = async () => {
    axios
      .get("https://caas-deploy.onrender.com/auth/users")
      .then((response) => {
        console.log("users", response.data.users);
        setUsers(response.data.users);
      });
  };

  useEffect(() => {
    getListUsers();
    getCalendars();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="home">
      <div className="panel-data">
        <h1>ADMIN PANEL</h1>
        <p>Total of accounts: {users && users.length}</p>
        <p>Total of calendars: {calendars.length} </p>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Calendars</th>
              <th className="hide">UID</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user: User) => (
                <tr key={user.uid}>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    {
                      calendars.filter(
                        (calendar) =>
                          calendar.data &&
                          (calendar.data as any).ownerUid === user.uid
                      ).length
                    }
                  </td>
                  <td className="hide">{user.uid}</td>
                </tr>
              ))}
          </tbody>
        </table>
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
