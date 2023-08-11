// Wrapper for all pages that need to be logged in to view. Wraps in main App component.

import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/loginContext';

interface LoggedInProps {
  children: React.ReactNode; // Specify the type for the children prop
}

const LoggedIn: React.FC<LoggedInProps> = ({ children }) => {
  const isLoggedIn = useContext(LoginContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return (
      <div>
        <p>"Please log in."</p>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default LoggedIn;
