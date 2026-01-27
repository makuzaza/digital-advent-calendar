import { Outlet } from "react-router-dom";
import Header from "../components/LandingPage/Header";
import Footer from "../components/LandingPage/Footer/Footer";

const Root: React.FC = () => {
  return (
    <div id="screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
