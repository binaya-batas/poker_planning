import { Route, Routes } from "react-router-dom"

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import './scss/styles.scss';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}