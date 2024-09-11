// Wrapper for all pages that need to be type admin to view. Wraps in main App component.

import React, { useContext } from "react";

//context
import { UserContext } from "../../context/userContext";

import { isEmergencyAdmin } from "../../services/functions/isAdmin";

interface VerifyEmergencyAdmin {
  children: React.ReactNode; // Specify the type for the children prop
}

const VerifyEmergencyAdmin: React.FC<VerifyEmergencyAdmin> = ({ children }) => {
  const user = useContext(UserContext);

  if (!isEmergencyAdmin(user)) {
    return (
      <div>
        <p>"Not admin type."</p>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default VerifyEmergencyAdmin;
