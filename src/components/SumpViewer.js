import React, { useState, useRef, useEffect } from "react";
import "./SumpViewer.css";

const SumpViewer = () => {
  const [labels, setLabels] = useState({
    A: "",
    B: "",
    C: "",
    1: "",
    2: "",
    3: "",
  });

  const [errors, setErrors] = useState({});
  const [showWire, setShowWire] = useState(false);

  const [calculatedA, setCalculatedA] = useState("");
  const [calculatedB, setCalculatedB] = useState("");
  const [calculatedE, setCalculatedE] = useState("");
  const [calculatedF, setCalculatedF] = useState("");
  const [calculatedH, setCalculatedH] = useState("");
  const [calculatedThree, setCalculatedThree] = useState("");

  const wireRef = useRef(null);

  const handleChange = (key, value) => {
    setLabels((prev) => ({
      ...prev,
      [key]: value === "" ? "" : parseInt(value) || 0,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  useEffect(() => {
    setCalculatedA(labels["A"] ? labels["A"] / 2 : "");
    setCalculatedB(labels["B"] ? labels["B"] / 3 : "");
    setCalculatedE(labels["A"] ? labels["A"] * 0.75 : "");
    setCalculatedF(labels["1"] ? labels["1"] + 25 : "");
    setCalculatedH(labels["1"] ? ((labels["1"] + 25) - 60) : "");
    setCalculatedThree(labels["3"] ? Number(labels["3"]) : "");
  }, [labels]);

  const validateFields = () => {
    const newErrors = {};
    let hasError = false;
    for (const [key, value] of Object.entries(labels)) {
      if (value === "" || value === null || isNaN(value)) {
        newErrors[key] = true;
        hasError = true;
      }
    }
    setErrors(newErrors);
    return !hasError;
  };

  const handleCalculate = () => {
    if (!validateFields()) {
      alert("All fields are mandatory. Please fill out missing values.");
      return;
    }
    setShowWire(true);
    setTimeout(() => {
      wireRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="main-container">
      {/* Logo and Header */}
      <div className="logo-container">
        <h1 className="company-name">WIER CALCULATOR</h1>
        <img src="/logo.png" alt="Company Logo" className="company-logo" />
      </div>

      <h2 className="sump-heading">SUMP - TOW HIGH SIDES - HIGH / LOW</h2>

      {/* Sump Section */}
      <div className="grid-2-layout">
        <div className="grid-item">
          <div className="sump-image">
            <img src="/sump.png" alt="Sump" className="sump-image" />
            <div className="label label-A">{labels.A}</div>
            <div className="label label-B">{labels.B}</div>
            <div className="label label-C">{labels.C}</div>
            <div className="label label-1">{labels[1]}</div>
            <div className="label label-2">{labels[2]}</div>
            <div className="label label-3">{labels[3]}</div>
          </div>
        </div>

        {/* Input Table */}
        <div className="grid-item">
          <h3>Input Values</h3>
          <table className="excel-table">
            <thead>
              <tr>
                <th>Label</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(labels).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className={errors[key] ? "input-error" : ""}
                    />
                    {errors[key] && <div className="error-text"></div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-right">
            <button className="calculate-button" onClick={handleCalculate}>
              Calculate
            </button>
          </div>
        </div>
      </div>

      {/* Wire Section */}
      {/* Wire Section */}
{showWire && (
  <div ref={wireRef}>
    <h2 className="wier-heading">WIER</h2>

    <div className="grid-2-layout">
      {/* Wire Image */}
      <div className="grid-item">
        <div className="wire-image">
          <img src="/wier.png" alt="Wire" className="wire-image" />
          <div className="wire-label wire-label-a">{Math.round(calculatedA)}</div>
          <div className="wire-label wire-label-b">{Math.round(calculatedB)}</div>
          <div className="wire-label wire-label-c">{Math.round(calculatedB)}</div>
          <div className="wire-label wire-label-d">40</div>
          <div className="wire-label wire-label-e">{Math.round(calculatedE)}</div>
          <div className="wire-label wire-label-f">{Math.round(calculatedF)}</div>
          <div className="wire-label wire-label-g">78</div>
          <div className="wire-label wire-label-h">{Math.round(calculatedH)}</div>
          <div className="wire-label wire-label-three">{Math.round(calculatedThree)}</div>
        </div>
      </div>

      {/* Calculated Table */}
      <div className="grid-item">
        <h3>Calculated Values</h3>
        <table className="excel-table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>{Math.round(calculatedA)}</td></tr>
            <tr><td>B</td><td>{Math.round(calculatedB)}</td></tr>
            <tr><td>C</td><td>{Math.round(calculatedB)}</td></tr>
            <tr><td>D</td><td>40</td></tr>
            <tr><td>E</td><td>{Math.round(calculatedE)}</td></tr>
            <tr><td>F</td><td>{Math.round(calculatedF)}</td></tr>
            <tr><td>G</td><td>78</td></tr>
            <tr><td>H</td><td>{Math.round(calculatedH)}</td></tr>
            <tr><td>I</td><td>{Math.round(calculatedThree)}</td></tr>
          </tbody>
        </table>
        <div className="button-right">
            <button className="calculate-button" >
              Export to pdf
            </button>
          </div>
        
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default SumpViewer;
