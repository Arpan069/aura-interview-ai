
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  isOnDashboardPage: boolean;
  isOnLoginPage: boolean;
  loginLink: string;
  dashboardLink: string;
}

const AuthButtons = ({ 
  isOnDashboardPage, 
  isOnLoginPage, 
  loginLink, 
  dashboardLink 
}: AuthButtonsProps) => {
  if (isOnDashboardPage) {
    return null;
  }

  if (isOnLoginPage) {
    return (
      <Link to={dashboardLink}>
        <Button variant="default" size="sm">
          Dashboard
        </Button>
      </Link>
    );
  }

  return (
    <Link to={loginLink}>
      <Button variant="outline" size="sm">
        Login
      </Button>
    </Link>
  );
};

export default AuthButtons;
