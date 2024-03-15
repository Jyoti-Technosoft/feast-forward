import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import AboutUs from './components/AboutUs';
import Donate from './components/Donate';
import JoinNow from "./components/JoinNow";
import Feedback from "./components/Feedback";
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login path="/login" />} />
          <Route element={<Registration />} path="/register" />
          <Route element={<Dashboard />} path="/home" />
          <Route element={<AboutUs />} path="/about-us"  />
          <Route element={<Donate />} path="/donate" />
          <Route element={<JoinNow />} path="/join-now" />
          <Route element={<Feedback />} path="/feedback" />

      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
