// src/components/Stopwatch.js
import React, { useState, useRef, useEffect } from 'react';

function pad(num, size = 2) {
  return String(num).padStart(size, '0');
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const hundredths = Math.floor((ms % 1000) / 10); // two digits
  return `${pad(minutes)}:${pad(seconds)}.${pad(hundredths)}`;
}

const Stopwatch = () => {
  // visible UI state
  const [elapsed, setElapsed] = useState(0); // milliseconds
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // refs for mutable values that shouldn't trigger re-renders
  const intervalRef = useRef(null); // holds setInterval id
  const startTimeRef = useRef(null); // Date.now() when started
  const pausedElapsedRef = useRef(0); // accumulated elapsed when paused

  // start handler
  const handleStart = () => {
    if (intervalRef.current) return; // already running
    setRunning(true);
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      // compute based on accumulated paused + current delta
      setElapsed(
        pausedElapsedRef.current + (Date.now() - startTimeRef.current)
      );
    }, 50); // update UI every 50ms for smoothness
  };

  // stop handler
  const handleStop = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    // store the current elapsed into pausedRef
    pausedElapsedRef.current = elapsed;
    setRunning(false);
  };

  // reset handler
  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    pausedElapsedRef.current = 0;
    startTimeRef.current = null;
    setElapsed(0);
    setRunning(false);
    setLaps([]);
  };

  // lap handler
  const handleLap = () => {
    setLaps((prev) => [elapsed, ...prev]); // newest first
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>Stopwatch</h2>

      <div style={{ fontSize: 32, marginBottom: 12 }}>
        {formatTime(elapsed)}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        {!running ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleStop}>Stop</button>
        )}
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleLap} disabled={!running && elapsed === 0}>
          Lap
        </button>
      </div>

      {laps.length > 0 && (
        <div style={{ maxWidth: 320, margin: '0 auto', textAlign: 'left' }}>
          <h3>Laps</h3>
          <ol>
            {laps.map((l, idx) => (
              <li key={idx}>{formatTime(l)}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
