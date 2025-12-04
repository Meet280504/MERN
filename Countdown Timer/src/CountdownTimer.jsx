import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [targetDate, setTargetDate] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const countdown = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(countdown);
  }, [isActive, targetDate]);

  const updateCountdown = () => {
    if (!targetDate) return;

    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      setIsActive(false);
      setTimeLeft({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      return;
    }

    setTimeLeft({
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    });
  };

  const startCountdown = () => {
    if (!targetDate) {
      alert("Please select a date!");
      return;
    }
    setIsActive(true);
    updateCountdown();
  };

  const resetCountdown = () => {
    setIsActive(false);
    setTargetDate("");
    setTimeLeft({});
  };

  return (
    <div className="app">
      <h1>Countdown Timer</h1>

      <div className="input-box">
        <label>Select Target Date</label>
        <input
          type="datetime-local"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button onClick={startCountdown} className="start-btn">Start</button>
        <button onClick={resetCountdown} className="reset-btn">Reset</button>
      </div>

      {isActive || timeLeft.seconds ? (
        <div className="timer-container">
          <div className="time-box">
            <h2>{timeLeft.days || "00"}</h2>
            <p>Days</p>
          </div>
          <div className="time-box">
            <h2>{timeLeft.hours || "00"}</h2>
            <p>Hours</p>
          </div>
          <div className="time-box">
            <h2>{timeLeft.minutes || "00"}</h2>
            <p>Minutes</p>
          </div>
          <div className="time-box">
            <h2>{timeLeft.seconds || "00"}</h2>
            <p>Seconds</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
