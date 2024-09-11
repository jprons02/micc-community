// Wrapper for all pages that need to be type admin to view. Wraps in main App component.

import React, { useContext } from "react";

//context
import { UserContext } from "../../context/userContext";

import { isTribalAdmin } from "../../services/functions/isAdmin";

interface VerifyTribalAdmin {
  children: React.ReactNode; // Specify the type for the children prop
}

const VerifyTribalAdmin: React.FC<VerifyTribalAdmin> = ({ children }) => {
  const user = useContext(UserContext);

  if (!isTribalAdmin(user)) {
    return (
      <div>
        <p>"Not admin type."</p>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default VerifyTribalAdmin;
