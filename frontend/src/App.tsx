import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// routes
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import ErrorPage from "./routes/ErrorPage";
// import Login from "./routes/Login";
import Register from "./routes/Register";
import Panel from "./routes/Panel";
import Favourites from "./routes/Favourites";
import Root from "./routes/Root";
import LandingPage from "./routes/LandingPage";
import Test from "./routes/Test";

// redux
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="" element={<Root />}>
            <Route path="home" element={<Home />} />
            <Route index path="/" element={<LandingPage />} />
            <Route path="login" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/test" element={<Test />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
