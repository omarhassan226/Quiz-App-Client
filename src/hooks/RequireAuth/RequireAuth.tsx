import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const requireAuth = (WrappedComponent: React.FC) => {
  const RequireAuthComponent: React.FC = props => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const navigate = useNavigate();

    useEffect(
      () => {
        if (!isAuthenticated) {
          navigate("/");
        }
      },
      [isAuthenticated, navigate]
    );

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return RequireAuthComponent;
};

export default requireAuth;
