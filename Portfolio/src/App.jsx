import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import PreLoading from "./components/PreLoading";
import React, { useEffect, useState } from "react";
import Project from "./components/Project";
import Login from "./dummyJsFile/Login";
import Admin from "./dummyJsFile/Admin";
import Reviews from "./components/Reviews";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <PreLoading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <main className="main">
                  <HomePage />
                </main>
              }
            >
              <Route path="/project" element={<Project />} />
              <Route path="/reviews" element={<Reviews />} />
            </Route>
            <Route path="/gozirim-admin" element={<Login />} />
            <Route path="/gozirim-admin-admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
