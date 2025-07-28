import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Tweets from "../pages/Tweets";

const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  const isLoggedIn = !!user;

  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/tweets" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/tweets" replace /> : <Signup />}
      />
      <Route
        path="/tweets"
        element={isLoggedIn ? <Tweets /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/tweets" : "/login"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
