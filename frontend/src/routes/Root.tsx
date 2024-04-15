import { Outlet } from "react-router-dom";
import Header from "../components/LandingPage/Header";
import Footer from "../components/LandingPage/Footer/Footer";

function Root() {
    return (<div>
        <Header />
        <Outlet />
        <Footer />
    </div>);
}

export default Root;