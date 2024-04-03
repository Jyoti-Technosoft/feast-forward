import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import AboutUs from './components/AboutUs';
import Donate from './components/Donate';
import JoinNow from "./components/JoinNow";
import Feedback from "./components/Feedback";
import ResetPassword from "./components/ResetPassword";

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Registration />} path="/register" />
          <Route element={<Dashboard />} path="/home" />
          <Route element={<AboutUs />} path="/about-us" />
          <Route element={<Donate />} path="/donate" />
          <Route element={<JoinNow />} path="/join-now" />
          <Route element={<Feedback />} path="/feedback" />
          <Route element={<ResetPassword />} path="/reset-password" /> 
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
