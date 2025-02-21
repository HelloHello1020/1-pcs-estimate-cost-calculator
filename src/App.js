import "./style.css"
import React, { useRef, useState, useEffect } from 'react';

function App() {
  const itemOptions = ["Phone", "Laptop/Macbook", "Printer", "Tablet/IPad", "Monitor", "CPU", "TV", "Air Cooler", "Air Fryer", "Guitar", "Others"]
  const locationOptions = ['Maesot', 'Yangon', 'Mandalay', 'Chiang Mai', 'Myawaddy', 'Bangkok'];

  const [selectedItemOption1, setSelectedItemOption] = useState("");
  const [deviceLength, setDeviceLength] = useState("");
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [homeDeliveryOptions, setHomeDeliveryOptions] = useState([]);
  const [selectedHomeDelivery, setSelectedHomeDelivery] = useState("");

  const homeDeliveryLocations = {
    Yangon: ["Dala", "Thanlyin", "Hmawbi", "Others", "No Door2Door"],
    Mandalay: ["19 Street, 115 Street x 58 Street, 48 Street", "19 Street, 115 Street x 58 Street, 92 Street", "Others", "No Door2Door"],
  };

  let homeDeliveryCost = ``;
  let estimatedCost = ``;

  useEffect(() => {
    setHomeDeliveryOptions(homeDeliveryLocations[selectedOption2] || []);
  }, [selectedOption2]);

  const estimateCost = useRef()
  const pageLink = useRef()

  const handleCalculate = () => {
    estimatedCost = "";
    homeDeliveryCost = ""; // Reset cost

    if (selectedOption2 === "Yangon") {
      if (["Dala", "Thanlyin", "Hmawbi"].includes(selectedHomeDelivery)) {
        homeDeliveryCost = `\n(Negotiate for the Door2Door cost)`;
      } else if (selectedHomeDelivery === "Others") {
        if (weight <= 3) {
          homeDeliveryCost = `\n2500 MMK`;
        } else {
          homeDeliveryCost = `\n${Math.round(((weight - 3) * 350) + 2500)} MMK`;
        }
      }
    }
  
    else if (selectedOption2 === "Mandalay") {
      if (weight > 10 || (length > 24 && width > 24 && height > 24)) {
        homeDeliveryCost = `\n(Negotiate for the Door2Door cost)`;
      }
      else {
        if (selectedHomeDelivery === "19 Street, 115 Street x 58 Street, 48 Street") {
          homeDeliveryCost = length > 12 && width > 12 && height > 12 && weight > 3
            ? `\n${Math.round(((weight - 3) * 1000) + 3000)} MMK`
            : `\n3000 MMK`;
        }
        else if (selectedHomeDelivery === "19 Street, 115 Street x 58 Street, 92 Street") {
          homeDeliveryCost = length > 12 && width > 12 && height > 12 && weight > 3
          ? `\n${Math.round(((weight - 3) * 1000) + 4000)} MMK`
          : `\n4000 MMK`;
        }
        else if (selectedHomeDelivery === "Others") {
          homeDeliveryCost = length > 12 && width > 12 && height > 12 && weight > 3
          ? `\n${Math.round(((weight - 3) * 1000) + 5000)} MMK`
          : `\n5000 MMK`;
        }
      }
    }

    if (selectedItemOption1 === "Others") {
      if ((selectedOption1 === "Maesot" && selectedOption2 === "Chiang Mai") || (selectedOption1 === "Chiang Mai" && selectedOption2 === "Maesot")) {
        if (weight <= 3) {
          if (length > 12 || width > 12 || height > 12) {
            estimatedCost = `฿${130}\n(฿30 for extra box size)`
          }
          else {
            estimatedCost = `฿${100}`
          }
        }

        else if (weight >= 3.1 && weight <= 10) {
          if (length > 18 || width > 18 || height > 18) {
            estimatedCost = `฿${Math.round(weight * 35 + 30)}\n(฿30 for extra box size)`
          }
          else {
            estimatedCost = `฿${Math.round(weight * 35)}`
          }
        }

        else if (weight >= 10.1 && weight <= 15) {
          if (length > 24 || width > 24 || height > 24) {
            estimatedCost = `฿${Math.round(weight * 30 + 30)}\n(฿30 for extra box size)`
          }
          else {
            estimatedCost = `฿${Math.round(weight * 30)}`
          }
        }

        else if (weight >= 15.1 && weight <= 20) {
          if (length > 24 || width > 24 || height > 24) {
            estimatedCost = `฿${Math.round(weight * 25)}\nClick the link below to negotiate about the full price`
          }
          else {
            estimatedCost = `฿${Math.round(weight * 25)}`
          }
        }

        else if (weight >= 20.1 && weight <= 100) {
          estimatedCost = `฿${Math.round(weight * 20)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }

        else {
          estimatedCost = `Too heavy for estimation\nClick the link below to negotiate about the price`
        }
      }

      else if ((selectedOption1 === "Maesot" && selectedOption2 === "Yangon") || (selectedOption1 === "Maesot" && selectedOption2 === "Mandalay") || (selectedOption1 === "Yangon" && selectedOption2 === "Maesot") || (selectedOption1 === "Mandalay" && selectedOption2 === "Maesot")) {
        if (weight <= 2) {
          if (length > 6 || width > 6 || height > 6) {
            estimatedCost = `฿120\n(฿20 for extra box size)`
          }
          else {
            estimatedCost = `฿100`
          }
        }

        else if (weight >= 2.1 && weight <= 3) {
          if (length > 8 || width > 8 || height > 8) {
            estimatedCost = `฿180\n(฿30 for extra box size)`
          }
          else {
            estimatedCost = `฿150`
          }
        }

        else if (weight >= 3.1 && weight <= 4) {
          if (length > 12 || width > 12 || height > 12) {
            estimatedCost = `฿250\n($50 for extra box size)`
          }
          else {
            estimatedCost = `฿200`
          }
        }

        else if (weight >= 4.1 && weight <= 10) {
          if (length > 18 || width > 18 || height > 18) {
            estimatedCost = `฿${Math.round(weight * 50 + 50)}\n(฿50 for extra box size)`
          }
          else {
            estimatedCost = `฿${Math.round(weight * 50)}`
          }
        }

        else if (weight >= 10.1 && weight <= 100) {
          estimatedCost = `฿${Math.round(weight * 45)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }

        else {
          estimatedCost = `฿${Math.round(weight * 35)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }

      else if (selectedOption1 === "Myawaddy" && selectedOption2 === "Maesot") {
        if (weight <= 5) {
          if (length > 12 || width > 12 || height > 12) {
            estimatedCost = `฿180\n(฿30 for extra box size)`
          }
          else {
            estimatedCost = `฿150`
          }
        }

        else if (weight >= 5.1 && weight <= 20) {
          if (length > 24 || width > 24 || height > 24) {
            estimatedCost = `฿${Math.round(weight * 35 + 20)}\n(฿20 for extra box size)`
          }
          else {
            estimatedCost = `฿${Math.round(weight * 35)}`
          }
        }

        else {
          estimatedCost = `฿${Math.round(weight * 30)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }

      else if (selectedOption1 === "Maesot" && selectedOption2 === "Myawaddy") {
        if (weight <= 5) {
          if (length > 12 || width > 12 || height > 12) {
            estimatedCost = `17000 MMK\n(2000 MMK for extra box size)`
          }
          else {
            estimatedCost = `15000 MMK`
          }
        }

        else if (weight >= 5.1 && weight <= 20) {
          if (length > 24 || width > 24 || height > 24) {
            estimatedCost = `${Math.round(weight * 2500 + 2000)} MMK\n(2000 for extra box size)`
          }
          else {
            estimatedCost = `${Math.round(weight * 2500)} MMK`
          }
        }

        else {
          estimatedCost = `${Math.round(weight * 1500)} MMK\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }

      else if ((selectedOption1 === "Chiang Mai" && selectedOption2 === "Yangon") || (selectedOption1 === "Chiang Mai" && selectedOption2 === "Mandalay") || (selectedOption1 === "Yangon" && selectedOption2 === "Chiang Mai") || (selectedOption1 === "Mandalay" && selectedOption2 === "Chiang Mai")) {
        if (weight < 2) {
          if (length > 6 || width > 6 || height > 6) {
            estimatedCost = `฿170\n(฿20 for extra box size)`
          }
          else {
            estimatedCost = `฿150`
          }
        }

        else if (weight >= 2.1 && weight <= 3) {
          if (length > 8 || width > 8 || height > 8) {
            estimatedCost = `฿230\n(฿30 for extra box size)`
          }
          else {
            estimatedCost = `฿200`
          }
        }

        else if (weight >= 3.1 && weight <= 4) {
          if (length > 12 || width > 12 || height > 12) {
            estimatedCost = `฿350\n(฿50 for extra box size)`
          }
          else {
            estimatedCost = `฿300`
          }
        }

        else if (weight >= 4.1 && weight <= 10) {
          if (length > 18 || width > 18 || height > 18) {
            estimatedCost = `฿${Math.round(weight * 60)}\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimatedCost = `฿${Math.round(weight * 60)}`
          }
        }

        else if (weight >= 10.1 && weight <= 100) {
          estimatedCost = `฿${Math.round(weight * 55)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }

        else {
          estimatedCost = `฿${Math.round(weight * 45)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }

      else if (selectedOption1 === "Bangkok" && selectedOption2 === "Yangon" || selectedOption1 === "Bangkok" && selectedOption2 === "Mandalay") {
        if (weight <= 4) {
          if (length > 10 || width > 10 || height > 10) {
            estimatedCost = `฿350\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimatedCost = `฿350`
          }
        }

        else if (weight >= 4.1 && weight <= 10) {
          if (length > 14 || width > 14 || height > 14) {
            estimatedCost = `฿${Math.round(weight * 65)}\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimatedCost = `฿${Math.round(weight * 65)}`
          }
        }

        else if (weight >= 10.1 && weight <= 100) {
          if (length > 18 || width > 18 || height > 18) {
            estimatedCost = `฿${Math.round(weight * 55)}\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimatedCost = `฿${Math.round(weight * 55)}`
          }
        }

        else {
          estimatedCost = `฿${Math.round(weight * 50)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }

      else if (selectedOption1 === "Yangon" && selectedOption2 === "Bangkok" || selectedOption1 === "Mandalay" && selectedOption2 === "Bangkok") {
        if (weight <= 4) {
          if (length > 10 || width > 10 || height > 10) {
            estimatedCost = `฿400\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimatedCost = `฿400`
          }
        }

        else if (weight >= 4.1 && weight <= 10) {
          if (length > 14 || width > 14 || height > 14) {
            estimatedCost = `฿${Math.round(weight * 70)}\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimatedCost = `฿${Math.round(weight * 70)}`
          }
        }

        else if (weight >= 10.1 && weight <= 100) {
          if (length > 18 || width > 18 || height > 18) {
            estimatedCost = `฿${Math.round(weight * 60)}\n(Only using weight)\nClick the link below to negotiate about the full price`
          }
          else {
            estimatedCost = `฿${Math.round(weight * 60)}`
          }
        }

        else {
          estimatedCost = `฿${Math.round(weight * 55)}\n(Only using weight)\nClick the link below to negotiate about the full price`
        }
      }
    }

    else if (selectedItemOption1 === "Phone") {
      if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
        estimatedCost = `฿400`
      }

      else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimatedCost = `฿500`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimatedCost = `฿600`
      }
    }

    else if (selectedItemOption1 === "Laptop/Macbook") {
      if (((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) || (selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimatedCost = `฿700`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimatedCost = `฿900`
      }
    }

    else if (selectedItemOption1 === "Printer") {
      if (((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) || (selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimatedCost = `฿900`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimatedCost = `฿1000`
      }
    }

    else if (selectedItemOption1 === "Tablet/IPad") {
      if (((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) || (selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimatedCost = `฿500`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimatedCost = `฿600`
      }
    }

    else if (selectedItemOption1 === "Monitor") {
      if (deviceLength <= 24) {
        if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
          estimatedCost = `฿${Math.round(deviceLength * 60)}`
        }
  
        else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
          estimatedCost = `฿${Math.round(deviceLength * 70)}`
        }
  
        else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
          estimatedCost = `฿${Math.round(deviceLength * 80)}`
        }
      }

      else {
        if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
          estimatedCost = `฿${Math.round(deviceLength * 50)}`
        }
  
        else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
          estimatedCost = `฿${Math.round(deviceLength * 60)}`
        }
  
        else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
          estimatedCost = `฿${Math.round(deviceLength * 70)}`
        }
      }
    }

    else if (selectedItemOption1 === "CPU") {
      if (((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) || (selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimatedCost = `฿900`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimatedCost = `฿1200`
      }
    }

    else if (selectedItemOption1 === "TV") {
      if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
        estimatedCost = `฿${Math.round(deviceLength * 70)}`
      }

      else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimatedCost = `฿${Math.round(deviceLength * 80)}`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimatedCost = `฿${Math.round(deviceLength * 90)}`
      }
    }

    else if (selectedItemOption1 === "Air Cooler") {
      if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
        estimatedCost = `฿800 - ฿1500`
      }

      else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimatedCost = `฿900 - ฿1600`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimatedCost = `฿1000 - ฿1800`
      }
    }

    else if (selectedItemOption1 === "Air Fryer") {
      if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
        estimatedCost = `฿300 - ฿400`
      }

      else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimatedCost = `฿400 - ฿500`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimatedCost = `฿500 - ฿600`
      }
    }

    else if (selectedItemOption1 === "Guiter") {
      if ((selectedOption1 === "Maesot" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Maesot")) {
        estimatedCost = `฿600`
      }

      else if ((selectedOption1 === "Chiang Mai" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Chiang Mai")) {
        estimatedCost = `฿700`
      }

      else if ((selectedOption1 === "Bangkok" && (selectedOption2 === "Myawaddy" || selectedOption2 === "Mandalay" || selectedOption2 === "Yangon")) || ((selectedOption1 === "Myawaddy" || selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") && selectedOption2 === "Bangkok")) {
        estimatedCost = `฿800`
      }
    }

    estimateCost.current.innerText = `${estimatedCost}${homeDeliveryCost}`
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

      {homeDeliveryOptions.length > 0 && (
        <div className="home-delivery">
          <select
            className="home-delivery-dropdown dropdown"
            value={selectedHomeDelivery}
            onChange={(e) => setSelectedHomeDelivery(e.target.value)}
          >
            <option value="">Door2Door Location</option>
            {homeDeliveryOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

        </div>
      )}

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

      <h2 className="estimate-cost" ref={estimateCost}></h2>
      <a className="page-link" ref={pageLink} href="https://www.facebook.com/share/1Dsn9K7jrQ/?mibextid=wwXIfr" target="_blank">Hello Logistics Thailand Page</a>
    </div>
  );
}

export default App;