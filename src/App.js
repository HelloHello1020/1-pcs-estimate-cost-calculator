import "./style.css"
import React, { useRef, useState } from 'react';

function App() {
  const options = ['Maesot', 'Yangon', 'Mandalay', 'Chiang Mai', 'Myawady', 'Bangkok'];

  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const estimateCost = useRef()
  const pageLink = useRef()

  const handleCalculate = () => {
    if ((selectedOption1 === "Maesot" && selectedOption2 === "Chiang Mai") || (selectedOption1 === "Chiang Mai" && selectedOption2 === "Maesot")) {
      if (weight <= 3) {
        if (length > 12 || width > 12 || height > 12) {
          estimateCost.current.innerText = "฿130\n(฿30 for extra box size)"
        }
        else {
          estimateCost.current.innerText = "฿100"
        }
      }

      else if (weight >= 3.1 && weight <= 10) {
        if (length > 18 || width > 18 || height > 18) {
          estimateCost.current.innerText = `฿${Math.round(weight * 35 + 30)}\n(฿30 for extra box size)`
        }
        else {
          estimateCost.current.innerText = `฿${Math.round(weight * 35)}`
        }
      }

      else if (weight >= 10.1 && weight <= 15) {
        if (length > 24 || width > 24 || height > 24) {
          estimateCost.current.innerText = `฿${Math.round(weight * 30 + 30)}\n(฿30 for extra box size)`
        }
        else {
          estimateCost.current.innerText = `฿${Math.round(weight * 30)}`
        }
      }

      else if (weight >= 15.1 && weight <= 20) {
        if (length > 24 || width > 24 || height > 24) {
          estimateCost.current.innerText = `฿${Math.round(weight * 25)}\n(click the link below to negotiate about the extra box size)`
          pageLink.current.href = "https://www.facebook.com/share/1Dsn9K7jrQ/?mibextid=wwXIfr"
          pageLink.current.target = "_blank"
          pageLink.current.innerText = "Hello Logistics Thailand Page"
        }
        else {
          estimateCost.current.innerText = `฿${Math.round(weight * 25)}`
        }
      }

      else if (weight >= 20.1 && weight <= 100) {
        estimateCost.current.innerText = `฿${Math.round(weight * 20)}\n(click the link below to negotiate about the full price)`
        pageLink.current.href = "https://www.facebook.com/share/1Dsn9K7jrQ/?mibextid=wwXIfr"
        pageLink.current.target = "_blank"
        pageLink.current.innerText = "Hello Logistics Thailand Page"
      }

      else {
        estimateCost.current.innerText = `Too heavy for estimation\n(click the link below to negotiate about the price)`
        pageLink.current.href = "https://www.facebook.com/share/1Dsn9K7jrQ/?mibextid=wwXIfr"
        pageLink.current.target = "_blank"
        pageLink.current.innerText = "Hello Logistics Thailand Page"
      }
    }

    else if ((selectedOption1 === "Maesot" && selectedOption2 === "Yangon") || (selectedOption1 === "Maesot" && selectedOption2 === "Mandalay") || (selectedOption1 === "Yangon" && selectedOption2 === "Maesot") || (selectedOption1 === "Mandalay" && selectedOption2 === "Maesot")) {
      if (weight <= 2) {
        if (length > 6 || width > 6 || height > 6) {
          estimateCost.current.innerText = `฿120\n(฿20 for extra box size)`
        }
        else {
          estimateCost.current.innerText = `฿100`
        }
      }

      else if (weight >= 2.1 && weight <= 3) {
        if (length > 8 || width > 8 || height > 8) {
          estimateCost.current.innerText = `฿180 \n(฿30 for extra box size)`
        }
        else {
          estimateCost.current.innerText = `฿150`
        }
      }

      else if (weight >= 3.1 && weight <= 4) {
        if (length > 12 || width > 12 || height > 12) {
          estimateCost.current.innerText = `฿250\n($50 for extra box size)`
        }
        else {
          estimateCost.current.innerText = `฿200`
        }
      }

      else if (weight >= 4.1 && weight <= 10) {
        if (length > 18 || width > 18 || height > 18) {
          estimateCost.current.innerText = `฿${Math.round(weight * 50 + 50)}\n(฿50 for extra box size)`
        }
        else {
          estimateCost.current.innerText = `฿${Math.round(weight * 50)}`
        }
      }

      else if (weight >= 10.1 && weight <= 100) {
        estimateCost.current.innerText = `฿${Math.round(weight * 45)}\n(click the link below to negotiate about the full price)`
        pageLink.current.href = "https://www.facebook.com/share/1Dsn9K7jrQ/?mibextid=wwXIfr"
        pageLink.current.target = "_blank"
        pageLink.current.innerText = "Hello Logistics Thailand Page"
      }

      else {
        estimateCost.current.innerText = `฿${Math.round(weight * 35)}\n(click the link below to negotiate about the full price)`
        pageLink.current.href = "https://www.facebook.com/share/1Dsn9K7jrQ/?mibextid=wwXIfr"
        pageLink.current.target = "_blank"
        pageLink.current.innerText = "Hello Logistics Thailand Page"
      }
    }
  };

  return (
    <div className="app">
      {/* From and To dropdowns */}
      <div>
        <select
          className="from-dropdown dropdown"
          value={selectedOption1}
          onChange={(e) => setSelectedOption1(e.target.value)}
        >
          <option value="">From</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="to-dropdown dropdown"
          value={selectedOption2}
          onChange={(e) => setSelectedOption2(e.target.value)}
        >
          <option value="">To</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Weight input with kg */}
      <div>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight"
          min="0"
        />
      </div>

      {/* Length, Width, and Height inputs */}
      <div>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          placeholder="Length"
          min="0"
        />
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Width"
          min="0"
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
          min="0"
        />
      </div>

      {/* Calculate button */}
      <div>
        <button className="calculate-button" onClick={handleCalculate}>
          Calculate
        </button>
      </div>

      <h1 className="estimate-cost" ref={estimateCost}>Estimated Cost</h1>
      <a ref={pageLink}></a>
    </div>
  );
}

export default App;