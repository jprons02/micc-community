import React, { useContext, useState } from 'react';

const LoginContext = React.createContext<boolean | null>(null);
const SetLoginContext = React.createContext<any>(null);

const LoginProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <LoginContext.Provider value={isLoggedIn}>
      <SetLoginContext.Provider value={setIsLoggedIn}>
      {children}
      </SetLoginContext.Provider>
    </LoginContext.Provider>
  );
};

export { LoginContext, SetLoginContext, LoginProvider };