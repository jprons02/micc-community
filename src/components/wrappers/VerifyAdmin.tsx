// Wrapper for all pages that need to be type admin to view. Wraps in main App component.

import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//context
import { UserContext } from '../../context/userContext';

interface VerifyAdminProps {
  children: React.ReactNode; // Specify the type for the children prop
}

const VerifyAdmin: React.FC<VerifyAdminProps> = ({ children }) => {
  const user = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (user.type) {
      if (user.type !== 'admin') {
        navigate('/home');
      }
    } else {
      navigate('/home');
    }
  }, [navigate]);

  if (!user.type || user.type !== 'admin') {
    return (
      <div>
        <p>"Not admin type."</p>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default VerifyAdmin;
