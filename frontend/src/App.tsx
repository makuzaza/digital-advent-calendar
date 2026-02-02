import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// routes
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import ErrorPage from "./routes/ErrorPage";
import Register from "./routes/Register";
import Panel from "./routes/Panel";
import Favourites from "./routes/Favourites";
import Root from "./routes/Root";
import LandingPage from "./routes/LandingPage";
import CalendarSingle from "./routes/CalendarSingle";
import CalendarsPage from "./routes/CalendarsPage";
import UserInfo from "./routes/UserInfo";
import MainApp from "./components/Calendar/MainApp";

// redux
import { store } from "./store/store";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import About from "./routes/About";
import Admin from "./routes/Admin";
import { refreshFirebaseToken } from "./utils/tokenUtils";
import { setupAxiosInterceptors } from "./config/axiosConfig";

function App() {
  const [search, setSearch] = useState("");

  // Setup axios interceptors and auto-refresh token on component mount
  useEffect(() => {
    // Setup axios interceptors once
    setupAxiosInterceptors();

    // Auto-refresh token every 50 minutes (before the 1-hour expiry)
    const tokenRefreshInterval = setInterval(async () => {
      try {
        await refreshFirebaseToken();
        // console.log("Token auto-refreshed");
      } catch (error) {
        // console.error("Auto-token refresh failed:", error);
      }
    }, 50 * 60 * 1000); // 50 minutes in milliseconds

    // Cleanup interval on unmount
    return () => clearInterval(tokenRefreshInterval);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="" element={<Root />}>
            <Route path="home" element={<Home />} />
            <Route
              index
              path="/"
              element={
                <LandingPage
                  search={search}
                  handleSearch={handleSearch}
                  setSearch={setSearch}
                />
              }
            />
            <Route path="login" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/preview" element={<MainApp />} />
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/calendars" element={<CalendarsPage />} />
            <Route path="/calendars/:calendarId" element={<CalendarSingle />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
