import { useEffect, useState } from "react";

function Timer({ isRunning }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
        zIndex: 1000,
      }}
    >
      ⏱ Tiempo: {time}s
    </div>
  );
}

export default Timer;