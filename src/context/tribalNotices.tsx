// Context that provides all data for user that is logged in

import { createContext, useState } from 'react';

const TribalNoticesContext = createContext<any>(null);
const SetTribalNoticesContext = createContext<any>(null);

const TribalNoticesProvider = ({ children }: any) => {
  const [tribalNotices, setTribalNotices] = useState<any>([{}]);
  return (
    <TribalNoticesContext.Provider value={tribalNotices}>
      <SetTribalNoticesContext.Provider value={setTribalNotices}>
        {children}
      </SetTribalNoticesContext.Provider>
    </TribalNoticesContext.Provider>
  );
};

export { TribalNoticesContext, SetTribalNoticesContext, TribalNoticesProvider };
