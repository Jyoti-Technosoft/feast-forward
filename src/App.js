import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/authentication/Login";
import Registration from "./components/authentication/Registration";
import Dashboard from "./components/Dashboard";
import AboutUs from "./components/AboutUs";
import Donate from "./components/Donate";
import JoinNow from "./components/JoinNow";
import Layout from "./components/Layout";
import Feedback from "./components/Feedback";
import Volunteers from "./components/Volunteers";
import JoinNowUsers from "./components/JoinNowUsers";
import "./App.css";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user && user.token ? true : false;

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route exact element={<Login />} path="/login" />
        <Route exact element={<Registration />} path="/register" />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route
          exact
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          exact
          path="/about-us"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          exact
          path="/join-now"
          element={
            <Layout>
              <JoinNow />
            </Layout>
          }
        />
        <Route
          exact
          path="/donate"
          element={
            <ProtectedRoute>
              <Layout>
                <Donate />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          element={
            <ProtectedRoute>
              <Layout>
                <Feedback />
              </Layout>
            </ProtectedRoute>
          }
          path="/feedback"
        />
        <Route
          exact
          element={
            <Layout>
              <JoinNowUsers />
            </Layout>
          }
          path="/join-now-users"
        />
        <Route
          exact
          element={
            <Layout>
              <Volunteers />
            </Layout>
          }
          path="/contributor"
        />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
