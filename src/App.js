import "./style.css"
import React, { useRef, useState } from 'react';

function App() {
  const itemOptions = ["Phone", "Laptop/Macbook", "Printer", "Tablet/IPad", "Monitor", "CPU", "TV", "Air Cooler", "Air Fryer", "Guitar", "Others"]
  const locationOptions = ['Maesot', 'Yangon', 'Mandalay', 'Chiang Mai', 'Myawaddy', 'Bangkok'];

  const [selectedItemOption1, setSelectedItemOption] = useState("")
  const [deviceLength, setDeviceLength] = useState("");
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const estimateCost = useRef()
  const pageLink = useRef()

  const handleCalculate = () => {
    if (selectedItemOption1 === "Others") {
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
            estimateCost.current.innerText = `฿${Math.round(weight * 25)}\nClick the link below to negotiate about the full price`
          }
          else {
            estimateCost.current.innerText = `฿${Math.round(weight * 25)}`
          }
        }

        else if (weight >= 20.1 && weight <= 100) {
          estimateCost.current.innerText = `฿${Math.round(weight * 20)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }

        else {
          estimateCost.current.innerText = `Too heavy for estimation\nClick the link below to negotiate about the price`
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
            estimateCost.current.innerText = `฿180\n(฿30 for extra box size)`
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
          estimateCost.current.innerText = `฿${Math.round(weight * 45)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }

        else {
          estimateCost.current.innerText = `฿${Math.round(weight * 35)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }

      else if (selectedOption1 === "Myawaddy" && selectedOption2 === "Maesot") {
        if (weight <= 5) {
          if (length > 12 || width > 12 || height > 12) {
            estimateCost.current.innerText = `฿180\n(฿30 for extra box size)`
          }
          else {
            estimateCost.current.innerText = `฿150`
          }
        }

        else if (weight >= 5.1 && weight <= 20) {
          if (length > 24 || width > 24 || height > 24) {
            estimateCost.current.innerText = `฿${Math.round(weight * 35 + 20)}\n(฿20 for extra box size)`
          }
          else {
            estimateCost.current.innerText = `฿${Math.round(weight * 35)}`
          }
        }

        else {
          estimateCost.current.innerText = `฿${Math.round(weight * 30)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }

      else if (selectedOption1 === "Maesot" && selectedOption2 === "Myawaddy") {
        if (weight <= 5) {
          if (length > 12 || width > 12 || height > 12) {
            estimateCost.current.innerText = `17000 MMK\n(2000 MMK for extra box size)`
          }
          else {
            estimateCost.current.innerText = `15000 MMK`
          }
        }

        else if (weight >= 5.1 && weight <= 20) {
          if (length > 24 || width > 24 || height > 24) {
            estimateCost.current.innerText = `${Math.round(weight * 2500 + 2000)} MMK\n(2000 for extra box size)`
          }
          else {
            estimateCost.current.innerText = `${Math.round(weight * 2500)} MMK`
          }
        }

        else {
          estimateCost.current.innerText = `${Math.round(weight * 1500)} MMK\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }

      else if ((selectedOption1 === "Chiang Mai" && selectedOption2 === "Yangon") || (selectedOption1 === "Chiang Mai" && selectedOption2 === "Mandalay") || (selectedOption1 === "Yangon" && selectedOption2 === "Chiang Mai") || (selectedOption1 === "Mandalay" && selectedOption2 === "Chiang Mai")) {
        if (weight < 2) {
          if (length > 6 || width > 6 || height > 6) {
            estimateCost.current.innerText = `฿170\n(฿20 for extra box size)`
          }
          else {
            estimateCost.current.innerText = `฿150`
          }
        }

        else if (weight >= 2.1 && weight <= 3) {
          if (length > 8 || width > 8 || height > 8) {
            estimateCost.current.innerText = `฿230\n(฿30 for extra box size)`
          }
          else {
            estimateCost.current.innerText = `฿200`
          }
        }

        else if (weight >= 3.1 && weight <= 4) {
          if (length > 12 || width > 12 || height > 12) {
            estimateCost.current.innerText = `฿350\n(฿50 for extra box size)`
          }
          else {
            estimateCost.current.innerText = `฿300`
          }
        }

        else if (weight >= 4.1 && weight <= 10) {
          if (length > 18 || width > 18 || height > 18) {
            estimateCost.current.innerText = `฿${Math.round(weight * 60)}\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimateCost.current.innerText = `฿${Math.round(weight * 60)}`
          }
        }

        else if (weight >= 10.1 && weight <= 100) {
          estimateCost.current.innerText = `฿${Math.round(weight * 55)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }

        else {
          estimateCost.current.innerText = `฿${Math.round(weight * 45)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }

      else if (selectedOption1 === "Bangkok" && selectedOption2 === "Yangon" || selectedOption1 === "Bangkok" && selectedOption2 === "Mandalay") {
        if (weight <= 4) {
          if (length > 10 || width > 10 || height > 10) {
            estimateCost.current.innerText = `฿350\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimateCost.current.innerText = `฿350`
          }
        }

        else if (weight >= 4.1 && weight <= 10) {
          if (length > 14 || width > 14 || height > 14) {
            estimateCost.current.innerText = `฿${Math.round(weight * 65)}\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimateCost.current.innerText = `฿${Math.round(weight * 65)}`
          }
        }

        else if (weight >= 10.1 && weight <= 100) {
          if (length > 18 || width > 18 || height > 18) {
            estimateCost.current.innerText = `฿${Math.round(weight * 55)}\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimateCost.current.innerText = `฿${Math.round(weight * 55)}`
          }
        }

        else {
          estimateCost.current.innerText = `฿${Math.round(weight * 50)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }

      else if (selectedOption1 === "Yangon" && selectedOption2 === "Bangkok" || selectedOption1 === "Mandalay" && selectedOption2 === "Bangkok") {
        if (weight <= 4) {
          if (length > 10 || width > 10 || height > 10) {
            estimateCost.current.innerText = `฿400\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimateCost.current.innerText = `฿400`
          }
        }

        else if (weight >= 4.1 && weight <= 10) {
          if (length > 14 || width > 14 || height > 14) {
            estimateCost.current.innerText = `฿${Math.round(weight * 70)}\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimateCost.current.innerText = `฿${Math.round(weight * 70)}`
          }
        }

        else if (weight >= 10.1 && weight <= 100) {
          if (length > 18 || width > 18 || height > 18) {
            estimateCost.current.innerText = `฿${Math.round(weight * 60)}\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimateCost.current.innerText = `฿${Math.round(weight * 60)}`
          }
        }

        else {
          estimateCost.current.innerText = `฿${Math.round(weight * 55)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }
    }

    else if (selectedItemOption1 === "Phone") {
      if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
        estimateCost.current.innerText = `฿400`
      }

      else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimateCost.current.innerText = `฿500`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimateCost.current.innerText = `฿600`
      }
    }

    else if (selectedItemOption1 === "Laptop/Macbook") {
      if (((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) || (selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimateCost.current.innerText = `฿700`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimateCost.current.innerText = `฿900`
      }
    }

    else if (selectedItemOption1 === "Printer") {
      if (((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) || (selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimateCost.current.innerText = `฿900`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimateCost.current.innerText = `฿1000`
      }
    }

    else if (selectedItemOption1 === "Tablet/IPad") {
      if (((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) || (selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimateCost.current.innerText = `฿500`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimateCost.current.innerText = `฿600`
      }
    }

    else if (selectedItemOption1 === "Monitor") {
      if (deviceLength <= 24) {
        if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
          estimateCost.current.innerText = `฿${Math.round(deviceLength * 60)}`
        }
  
        else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
          estimateCost.current.innerText = `฿${Math.round(deviceLength * 70)}`
        }
  
        else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
          estimateCost.current.innerText = `฿${Math.round(deviceLength * 80)}`
        }
      }

      else {
        if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
          estimateCost.current.innerText = `฿${Math.round(deviceLength * 50)}`
        }
  
        else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
          estimateCost.current.innerText = `฿${Math.round(deviceLength * 60)}`
        }
  
        else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
          estimateCost.current.innerText = `฿${Math.round(deviceLength * 70)}`
        }
      }
    }

    else if (selectedItemOption1 === "CPU") {
      if (((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) || (selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimateCost.current.innerText = `฿900`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimateCost.current.innerText = `฿1200`
      }
    }

    else if (selectedItemOption1 === "TV") {
      if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
        estimateCost.current.innerText = `฿${Math.round(deviceLength * 70)}`
      }

      else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimateCost.current.innerText = `฿${Math.round(deviceLength * 80)}`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimateCost.current.innerText = `฿${Math.round(deviceLength * 90)}`
      }
    }

    else if (selectedItemOption1 === "Air Cooler") {
      if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
        estimateCost.current.innerText = `฿800 - ฿1500`
      }

      else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimateCost.current.innerText = `฿900 - ฿1600`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimateCost.current.innerText = `฿1000 - ฿1800`
      }
    }

    else if (selectedItemOption1 === "Air Fryer") {
      if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
        estimateCost.current.innerText = `฿300 - ฿400`
      }

      else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimateCost.current.innerText = `฿400 - ฿500`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimateCost.current.innerText = `฿500 - ฿600`
      }
    }

    else if (selectedItemOption1 === "Guiter") {
      if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
        estimateCost.current.innerText = `฿600`
      }

      else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimateCost.current.innerText = `฿700`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimateCost.current.innerText = `฿800`
      }
    }
  };

  return (
    <div className="app">
      <div className="overlay"></div>

      <div className="item-type">
      <select
          className="item-type-dropdown dropdown"
          value={selectedItemOption1}
          onChange={(e) => setSelectedItemOption(e.target.value)}
        >
          <option value="">Item Type</option>
          {itemOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {(selectedItemOption1 === "Monitor" || selectedItemOption1 === "TV") && 
        <div className="device-length-input">
        <input
          className="device-length-input-box"
          type="number"
          value={deviceLength}
          onChange={(e) => setDeviceLength(e.target.value)}
          placeholder="Device Length (inches)"
          min="0"
        />
      </div>
      }

      {/* From and To dropdowns */}
      <div className="location-dropdowns">
        <select
          className="from-dropdown dropdown"
          value={selectedOption1}
          onChange={(e) => setSelectedOption1(e.target.value)}
        >
          <option value="">From</option>
          {locationOptions.map((option, index) => (
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
          {locationOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {/* Weight input with kg */}
      <div className="weight-input">
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight (kg)"
          min="0"
        />
      </div>

      {/* Length, Width, and Height inputs */}
      <div className="size-input">
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          placeholder="Length (inches)"
          min="0"
        />
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Width (inches)"
          min="0"
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height (inches)"
          min="0"
        />
      </div>

      {/* Calculate button */}
      <div>
        <button className="calculate-button" onClick={handleCalculate}>
          Calculate
        </button>
      </div>

      <h2 className="estimate-cost" ref={estimateCost}>Estimated Cost</h2>
      <a className="page-link" ref={pageLink} href="https://www.facebook.com/share/1Dsn9K7jrQ/?mibextid=wwXIfr" target="_blank">Hello Logistics Thailand Page</a>
    </div>
  );
}

export default App;