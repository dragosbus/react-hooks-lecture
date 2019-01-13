import React, { useState, useEffect } from "react";

const ligh = {
  width: 50,
  height: 50
};

export default function App() {
  const [counter, setCounter] = useState(0);
  const [light, toggleLight] = useState(false);
  const [position, setPosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);

  const change = by => setCounter(prevstate => prevstate + by);

  useEffect(
    () => {
      document.title = `Counter is ${counter}`;
      window.addEventListener("mousemove", handleMousemove);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("mousemove", handleMousemove);
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    },
    [status]
  );

  const handleMousemove = event =>
    setPosition({ x: event.pageX, y: event.pageY });

  const handleOnline = () => setStatus(true);
  const handleOffline = () => setStatus(false);

  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => change(-1)}>+</button>
      <p
        style={{ background: light ? "yellow" : "grey", ...ligh }}
        onClick={() => toggleLight(!light)}
      />
      <p>{JSON.stringify(position)} </p>
      <p>You are {status ? "online" : "offline"}</p>
    </div>
  );
}
