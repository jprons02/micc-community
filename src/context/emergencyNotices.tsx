// Context that provides all data for user that is logged in

import { createContext, useState } from 'react';

const EmergencyNoticesContext = createContext<any>(null);
const SetEmergencyNoticesContext = createContext<any>(null);

const EmergencyNoticesProvider = ({ children }: any) => {
  const [emergencyNotices, setEmergencyNotices] = useState<any>([]);
  return (
    <EmergencyNoticesContext.Provider value={emergencyNotices}>
      <SetEmergencyNoticesContext.Provider value={setEmergencyNotices}>
        {children}
      </SetEmergencyNoticesContext.Provider>
    </EmergencyNoticesContext.Provider>
  );
};

export {
  EmergencyNoticesContext,
  SetEmergencyNoticesContext,
  EmergencyNoticesProvider,
};
