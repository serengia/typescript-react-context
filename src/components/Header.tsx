import Button from "./UI/Button.tsx";
import { useTimersContext } from "./context/TimersContext.tsx";

export default function Header() {
  const timersCxt = useTimersContext();
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button>{timersCxt.isRunning ? "Stop" : "Start"} Timers</Button>
    </header>
  );
}
