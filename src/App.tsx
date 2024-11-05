// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import requireAuth from "./hooks/RequireAuth/RequireAuth";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const AuthenticatedDashboard = requireAuth(Dashboard);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <AuthenticatedDashboard />
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
