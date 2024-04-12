import { Outlet } from "react-router-dom";
import Header from "../components/LandingPage/Header";

function Root() {
    return (<div>
        <Header />
        <Outlet />
    </div>);
}

export default Root;