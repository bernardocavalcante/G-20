import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import CountriesPage from "./pages/CountriesPage";
import AuthoritiesPage from "./pages/AuthoritiesPage";
import AgendasPage from "./pages/AgendasPage";
import NotFound from "./pages/NotFound";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/countries/:countryCode" element={<CountriesPage />} />
          <Route path="/authorities" element={<AuthoritiesPage />} />
          <Route path="/agendas" element={<AgendasPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
