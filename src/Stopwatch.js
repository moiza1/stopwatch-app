import { useEffect, useState } from 'react';
import './Style.css';
import React from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [stop, setStop] = useState(undefined);
  const [isPaused, setisPaused] = useState(false);

  useEffect(() => {
    let timeCheck;
    if (isPaused) {
      timeCheck = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(timeCheck);
  }, [isPaused, time]);

 
  const handlePause = () => {
    setisPaused(!isPaused);
    setStop(undefined);

  };

  const handleReset = () => {
    setTime(0);
    setisPaused(false);
    setStop(undefined);
  };

  const handleStop = () =>{
    setStop(time);
    setTime(0);
    setisPaused(false);
  }

  return (
    <React.Fragment>
      <TimeDisplay time={time} />
     
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={handlePause}>
          {isPaused ? "Pause" : "Start"}
        </button>
        <button className="stopwatch-button" onClick={handleStop}>Stop</button>
        <button className="stopwatch-button" onClick={handleReset}>
          Reset
        </button>

      </div>
      {stop && <TimeDisplay time={stop}/> }

    </React.Fragment>
  );
}

export default Stopwatch;

//Re-usable component to render time at the stop time

const TimeDisplay =({time})=>{

 //conversions for time 
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  return (
    <p className="stopwatch-time">
      {hours}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}:
      {milliseconds.toString().padStart(2, "0")}
   </p>
    
  )

}
