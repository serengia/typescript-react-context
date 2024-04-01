import { type ReactNode, createContext, useContext, useReducer } from "react";

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
    payload: TimersState;
  };
  type StartTimerAction = {
    type: "START_TIMER";
  };
  type StopTimerAction = {
    type: "STOP_TIMER";
  };

  type TimerActions = AddTimerAction | StartTimerAction | StopTimerAction;

  const [timersState, dispatch] = useReducer(timersReducerFn, initialState);

  function timersReducerFn(
    state: TimersState,
    action: TimerActions
  ): TimersState {
    if (action.type ==="START_TIMER" ) {
      return {
        ...state,
        isRunning: true
      }
    }
    if (action.type ==="STOP_TIMER" ) {
      return {
        ...state,
        isRunning: false
      }
    }
    if (action.type ==="ADD_TIMER" ) {
      return {
        ...state,
       timers: {
        ...state.timers, {name: action.payload.name, duration:action.payload.duration }
       }
      }
    }
    return state;

  }



  const cxt: TimersContextValue = {
    timers: [],
    isRunning: false,
    addTimer: (timerData: Timer) => {
      console.log(timerData);
      dispatch({type: "ADD_TIMER", payload: timerData})
    },
    startTimers: () => {},
    stopTimers: () => {},
  };

  return (
    <TimersContext.Provider value={cxt}>{children}</TimersContext.Provider>
  );
}
