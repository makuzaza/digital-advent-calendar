// styles
import "./Home.css";
import Login from "./Login";

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Calendars Landing Page</h1>
      <div className="calendar">
        <div className="parts">Large Picture</div>
        <div className="parts"><Login/></div>
      </div>
    </div>
  );
};

export default Home;
