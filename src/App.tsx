import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./index.css";

const FISH_COUNT = 5;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const fishTick = () => {};

interface Point {
  x: number;
  y: number;
}

enum Direction {
  LEFT = -1,
  RIGHT = 1,
}

const Fish = ({ num }: { num: number }) => {
  const [position, setPosition] = useState<Point>({
    x: Math.random() * 75,
    y: Math.random() * 75,
  });

  const [direction, setDirection] = useState<Direction>(
    position.x > 50 ? Direction.LEFT : Direction.RIGHT
  );

  // @ts-ignore 
  useEffect(async () => {
    const sleepTime = Math.random() * 5 * 1000;
    await sleep(sleepTime);
    while (true) {
      const x = Math.random() * 75;
      const y = Math.random() * 75;
      setDirection(x < position.x ? Direction.LEFT : Direction.RIGHT);
      setPosition({ x, y });
      // 5-10 seconds
      const sleepTime = (Math.random() * 5 + 5) * 1000;
      await sleep(sleepTime);
    }
  }, []);

  return (
    <img
      src={`/fishes/fish${num}.webp`}
      className="absolute w-60 transform-gpu transition-transform ease-in-out "
      style={{
        transform: `translate(${position.x}vw, ${position.y}vh) scale(${direction}, 1)`,
        transitionDuration: "5s",
      }}
    ></img>
  );
};

function App() {
  return (
    <div className="bg-blue-600 h-screen overflow-hidden">
      <div className="absolute flex justify-center items-center h-screen w-screen ">
        <h1 className="text-center text-white font-semibold text-5xl">Aidan Dunlap</h1>
      </div>
      <div className="overflow-hidden">
        <Fish num={1} />
        <Fish num={2} />
        <Fish num={3} />
        <Fish num={4} />
        <Fish num={5} />
      </div>
    </div>
  );
}

export default App;
