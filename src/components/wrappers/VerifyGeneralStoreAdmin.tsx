// Wrapper for all pages that need to be type admin to view. Wraps in main App component.

import React, { useContext } from "react";

//context
import { UserContext } from "../../context/userContext";

import { isGeneralStoreAdmin } from "../../services/functions/isAdmin";

interface VerifyGeneralStoreAdmin {
  children: React.ReactNode; // Specify the type for the children prop
}

const VerifyGeneralStoreAdmin: React.FC<VerifyGeneralStoreAdmin> = ({
  children,
}) => {
  const user = useContext(UserContext);

  if (!isGeneralStoreAdmin(user)) {
    return (
      <div>
        <p>"Not admin type."</p>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default VerifyGeneralStoreAdmin;
