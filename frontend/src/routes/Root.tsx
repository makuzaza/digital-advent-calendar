import { Outlet } from "react-router-dom";
import Header from "../components/LandingPage/Header";
import Footer from "../components/LandingPage/Footer/Footer";

type RootProps = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
};

const Root: React.FC<RootProps> = ({ handleSearch, search }) => {
  return (
    <div>
      <Header handleSearch={handleSearch} search={search} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
