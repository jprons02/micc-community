// Wrapper for all pages that need to be type admin to view. Wraps in main App component.

import React, { useContext } from "react";

//context
import { UserContext } from "../../context/userContext";

import { isSnackbarAdmin } from "../../services/functions/isAdmin";

interface VerifySnackbarAdmin {
  children: React.ReactNode; // Specify the type for the children prop
}

const VerifySnackbarAdmin: React.FC<VerifySnackbarAdmin> = ({ children }) => {
  const user = useContext(UserContext);

  if (!isSnackbarAdmin(user)) {
    return (
      <div>
        <p>"Not admin type."</p>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default VerifySnackbarAdmin;
