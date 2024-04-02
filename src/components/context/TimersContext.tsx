import { type ReactNode, createContext, useContext, useReducer } from "react";

export type Timer = {
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

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
  const timersCxt = useContext(TimersContext);
  if (timersCxt === null) {
    throw new Error("Something went wrong. Context can never be null.");
  }

  return timersCxt;
}

type TimersContextProviderProps = {
  children: ReactNode;
};

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const initialState: TimersState = {
    isRunning: false,
    timers: [],
  };

  type AddTimerAction = {
    type: "ADD_TIMER";
    payload: Timer;
  };
  type StartTimerAction = {
    type: "START_TIMERS";
  };
  type StopTimerAction = {
    type: "STOP_TIMERS";
  };

  type TimerActions = AddTimerAction | StartTimerAction | StopTimerAction;

  function timersReducerFn(
    state: TimersState,
    action: TimerActions
  ): TimersState {
    if (action.type === "START_TIMERS") {
      return {
        ...state,
        isRunning: true,
      };
    }
    if (action.type === "STOP_TIMERS") {
      return {
        ...state,
        isRunning: false,
      };
    }
    if (action.type === "ADD_TIMER") {
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            name: action.payload.name,
            duration: action.payload.duration,
          },
        ],
      };
    }

    return state;
  }

  const [timersState, dispatch] = useReducer(timersReducerFn, initialState);

  const cxt: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer: (timerData) => {
      console.log(timerData);
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimers: () => {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimers: () => {
      dispatch({ type: "STOP_TIMERS" });
    },
  };

  return (
    <TimersContext.Provider value={cxt}>{children}</TimersContext.Provider>
  );
}
