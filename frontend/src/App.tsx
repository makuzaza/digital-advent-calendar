import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";

// routes
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Panel from "./routes/Panel";
import Favourites from "./routes/Favourites";
import Root from "./routes/Root";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
