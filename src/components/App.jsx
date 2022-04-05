import { Container } from "react-bootstrap";
import { AuthProviders } from "../contexts/AuthContext";
import "../styles.css";
import Login from "./login";
import Signup from "./Signup";
import Dashboard from "./dashboard";
import PrivateRoute from "./privateRoutes";
import ForgetPassword from "./ForgetPassword";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {Container} from 'react-bootstrap';

export default function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minheight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProviders>
            <Routes>
              <Route path="/signup" element={<Signup />} />{" "}
              <Route path="/login" element={<Login />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
            </Routes>
          </AuthProviders>
        </Router>
      </div>
    </Container>
  );
}
