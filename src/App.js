import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { SnackbarProvider, useSnackbar } from "notistack";
import Login from "./Components/Login";
import Users from "./Components/Users";
function App() {
  return (
    <div className={`App`}>
      <SnackbarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </div>
  );
}

export default App;
