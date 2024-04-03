import { useEffect, useRef, useState } from "react";
import Container from "./UI/Container.tsx";
import {
  useTimersContext,
  type Timer as TimerProps,
} from "./context/TimersContext.tsx";

export default function Timer({ name, duration }: TimerProps) {
  const timerRef = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimersContext();

  if (remainingTime <= 0 && timerRef.current) {
    clearInterval(timerRef.current);
  }

  let timer: number;
  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            return prevTime;
          }
          return prevTime - 50;
        });
      }, 50);

      timerRef.current = timer;
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
