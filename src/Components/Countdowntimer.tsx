

"use client";

import React, { useEffect, useState, useCallback } from "react";

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState<string>(""); // Set time as string to allow empty state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const handleStart = useCallback(() => {
    const parsedTime = parseInt(time, 10); // Parse the string input to number
    if (parsedTime > 0) {
      setRemainingTime(parsedTime);
      setIsRunning(true);
    }
  }, [time]);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setRemainingTime(0);
    setTime("");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-center">
        ⏳ Countdown Timer ⏳
      </h1>

      {/* Input Field for Timer */}
      <input
        type="number"
        min="0"
        aria-label="Set countdown time in seconds"
        className="text-xl p-2 rounded-md border border-purple-400 bg-white text-center text-gray-800 w-full max-w-xs mb-4"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Enter time (seconds)"
      />

      {/* Timer Controls */}
      <div className="flex flex-wrap justify-center space-x-2 mb-4">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={handleStart}
          aria-label="Start timer"
        >
          Start
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          onClick={handlePause}
          aria-label="Pause timer"
        >
          Pause
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={handleReset}
          aria-label="Reset timer"
        >
          Reset
        </button>
      </div>

      {/* Display Countdown */}
      <h2 className="text-3xl font-bold">
        {remainingTime > 0 ? remainingTime : "Enter time"}{" "}
        <span className="text-xl">{remainingTime > 0 ? "seconds" : ""}</span>
      </h2>
    </div>
  );
};

export default CountdownTimer;


