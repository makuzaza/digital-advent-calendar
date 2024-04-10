import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { BannerTop } from "./components/LandingPage/banner/BannerTop";
// routes
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Panel from "./routes/Panel";
import Favourites from "./routes/Favourites";
import Root from "./routes/Root";
import Footer from "./components/LandingPage/Footer/Footer";



function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/panel" element={<Panel />} />
          </Route>
        </Routes>
        <ParallaxProvider>
      <BannerTop />
      <div className="center full">
        <h1 className="headline gray"></h1>
      </div>
    </ParallaxProvider>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
