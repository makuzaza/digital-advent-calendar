import { useEffect, useState } from "react";
import Calendars, { Calendar } from "./Calendars";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import "./Home.css";

interface User {
  uid: string;
  displayName: string;
  email: string;
}

const maskAllChars = (value: string) => "*".repeat(value.length);

const maskEmail = (email: string) => {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "*@*.ru";

  const parts = domain.split(".");
  if (parts.length < 2) {
    return `${maskAllChars(local)}@${maskAllChars(domain)}`;
  }

  const tld = parts.pop() as string;
  const maskedDomain = `${maskAllChars(parts.join("."))}.${tld}`;

  return `${maskAllChars(local)}@${maskedDomain}`;
};

const maskUid = (uid: string, visible = 5) => {
  if (!uid) return "";
  const prefix = uid.slice(0, visible);
  const maskedTail = maskAllChars(uid.slice(visible));

  return `${prefix}${maskedTail}`;
};

const Admin: React.FC = () => {
  const [search, setSearch] = useState("");

  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const getCalendars = async () => {
    axios
      .get(`${API_URL}/firestore/calendars`)
      .then((response) => {
        // console.log("calendars", response.data);
        setCalendars(response.data);
      });
  };

  const getListUsers = async () => {
    axios
      .get(`${API_URL}/auth/users`)
      .then((response) => {
        // console.log("users", response.data.users);
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
    // console.log(users);
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
                  <td>{maskEmail(user.email)}</td>
                  <td>
                    {
                      calendars.filter(
                        (calendar) =>
                          calendar.data &&
                          (calendar.data as any).ownerUid === user.uid
                      ).length
                    }
                  </td>
                  <td className="hide">{maskUid(user.uid)}</td>
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
