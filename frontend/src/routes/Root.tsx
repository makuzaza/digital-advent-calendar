import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/LandingPage/Header";
import Footer from "../components/LandingPage/Footer/Footer";
import Search from "../components/Search";

// type RootProps = {
//   handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   search: string;
// };

// const Root: React.FC<RootProps> = ({ handleSearch, search }) => {
//   const { pathname } = useLocation();

  const Root: React.FC = () => {
  return (
    <div>
      <Header />
      {/* {(pathname === "/calendars" || pathname === "/favourites") && (
        <Search handleSearch={handleSearch} search={search} />
      )} */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
