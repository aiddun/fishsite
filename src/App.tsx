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

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="white"
      d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className=""
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="white"
      d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
    />
  </svg>
);

function App() {
  const [popup, setPopup] = useState(false);
  return (
    <div className="bg-blue-600 h-screen overflow-hidden text-white">
      <div className="absolute flex justify-center items-center h-screen w-screen ">
        <div className="">
          <h1 className="text-center  font-semibold text-5xl">Aidan Dunlap</h1>
          <div className="flex justify-center pt-1">
            <a
              onClick={() => {
                window.open(
                  "https://mailhide.io/e/YIjPbLRJ",
                  "mailhidepopup",
                  "width=580,height=635"
                );
                setPopup(true);
                return false;
              }}
              href="#"
              className="cursor-pointer"
            >
              <div>
                <MailIcon />
              </div>
            </a>
            <a
              href="https://linkedin.com/in/aidandunlap"
              className="cursor-pointer"
            >
              <div>
                <LinkedInIcon />
              </div>
            </a>
          </div>
          {popup && (
            <p className="text-center text-sm">anti-spam popup opened</p>
          )}
        </div>
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
