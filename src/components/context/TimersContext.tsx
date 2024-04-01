import { type ReactNode, createContext } from "react";

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

type TimersContextProviderProps = {
  children: ReactNode;
};

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const cxt: TimersContextValue = {
    timers: [],
    isRunning: false,
    addTimer: (timerData) => {
      console.log(timerData);
    },
    startTimers: () => {},
    stopTimers: () => {},
  };

  return <TimerContext.Provider value={cxt}>{children}</TimerContext.Provider>;
}
