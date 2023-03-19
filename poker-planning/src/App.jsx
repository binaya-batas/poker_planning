import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import CreateSession from "./pages/CreateSession";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";

import './scss/styles.scss';

export default function App() {
    const user = JSON.parse(sessionStorage.getItem("user"));

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/session" element={<CreateSession />} />
            <Route path="/session/:id" element={<Dashboard />} />
            <Route path="/session/history" element={<History />} />
        </Routes>
    );
}