import { createContext } from "react";

type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimerContext = createContext<TimersContextValue | null>(null);

export default function AppContext() {
  return (
    <TimerContext.Provider value={null}>
      <h2>Hello there</h2>
    </TimerContext.Provider>
  );
}
