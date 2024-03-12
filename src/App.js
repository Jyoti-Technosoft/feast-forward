import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./components/authentication/Login";
import Registration from "./components/authentication/Registration";
import Dashboard from "./components/Dashboard";
import AboutUs from "./components/AboutUs";
import Donate from "./components/Donate";
import JoinNow from "./components/JoinNow";
import Layout from "./components/Layout";
import "./App.css";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user && user.token ? true : false;

  const ProtectedRoute = () => {
    return isLoggedIn ? <Outlet key={Math.random()} /> : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route index element={<Login />} path="/" />
        <Route element={<Registration />} path="/register" />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/home"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/about-us"
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />
          <Route
            path="/join-now"
            element={
              <Layout>
                <JoinNow />
              </Layout>
            }
          />
          <Route
            path="/donate"
            element={
              <Layout>
                <Donate />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
