import { useState } from "react";
import "./App.css";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    if (!height || !weight) {
      alert("Please enter both height and weight!");
      return;
    }

    let heightM = height / 100;
    let result = (weight / (heightM * heightM)).toFixed(1);
    setBmi(result);

    if (result < 18.5) setStatus("Underweight");
    else if (result < 24.9) setStatus("Normal");
    else if (result < 29.9) setStatus("Overweight");
    else setStatus("Obese");
  };

  const resetData = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
  };

  return (
    <div className="wrapper">

      <div className="sidebar">
        <h2>BMI Calculator</h2>
        <p>Body Mass Index Analysis</p>
      </div>

      <div className="content">
        <div className="card">
          <h3>Enter Your Details</h3>

          <form onSubmit={calculateBMI}>
            <div className="input-group">
              <label>Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ex: 170"
              />
            </div>

            <div className="input-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 60"
              />
            </div>

            <div className="btn-group">
              <button className="btn calculate-btn">Calculate BMI</button>
              <button type="button" className="btn reset-btn" onClick={resetData}>
                Reset
              </button>
            </div>
          </form>

          {bmi && (
            <div className="result">
              <h2>{bmi}</h2>
              <p className="bmi-status">{status}</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
