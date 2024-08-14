// Context that provides all data for user that is logged in

import { createContext, useState } from 'react';

const SnackbarContext = createContext<any>(null);
const SetSnackbarContext = createContext<any>(null);

const SnackbarRestaurantProvider = ({ children }: any) => {
  const [snackbarInfo, setSnackbarInfo] = useState<any>([]);
  return (
    <SnackbarContext.Provider value={snackbarInfo}>
      <SetSnackbarContext.Provider value={setSnackbarInfo}>
        {children}
      </SetSnackbarContext.Provider>
    </SnackbarContext.Provider>
  );
};

export {
  SnackbarContext,
  SetSnackbarContext,
  SnackbarRestaurantProvider,
};
