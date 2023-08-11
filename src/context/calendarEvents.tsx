// Context that provides all data for CalendarEvents that is logged in

import { createContext, useState } from 'react';

const CalendarEventsContext = createContext<any>(null);
const SetCalendarEventsContext = createContext<any>(null);

const CalendarEventsProvider = ({ children }: any) => {
  const [calendarEvents, setCalendarEvents] = useState<any>([]);
  return (
    <CalendarEventsContext.Provider value={calendarEvents}>
      <SetCalendarEventsContext.Provider value={setCalendarEvents}>
        {children}
      </SetCalendarEventsContext.Provider>
    </CalendarEventsContext.Provider>
  );
};

export {
  CalendarEventsContext,
  SetCalendarEventsContext,
  CalendarEventsProvider,
};
