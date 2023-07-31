// Context that provides all data for user that is logged in

import { createContext, useState } from 'react';

const UserContext = createContext<any>(null);
const SetUserContext = createContext<any>(null);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>({});
  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};

export { UserContext, SetUserContext, UserProvider };
