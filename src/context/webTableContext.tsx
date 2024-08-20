// Context that provides all website table data

import { createContext, useState } from "react";

const WebTableDataContext = createContext<any>(null);
const SetWebTableDataContext = createContext<any>(null);

const WebTableDataProvider = ({ children }: any) => {
  const [webTableData, setWebTableData] = useState<any>([]);
  return (
    <WebTableDataContext.Provider value={webTableData}>
      <SetWebTableDataContext.Provider value={setWebTableData}>
        {children}
      </SetWebTableDataContext.Provider>
    </WebTableDataContext.Provider>
  );
};

export { WebTableDataContext, SetWebTableDataContext, WebTableDataProvider };
