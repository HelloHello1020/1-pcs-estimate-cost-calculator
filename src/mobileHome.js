import "./mobileStyle.css"
import React, { useRef, useState, useEffect } from 'react';
import { Button, Card, InputNumber, Divider } from 'antd';

const MobileHome = () => {
    const itemOptions = ["Phone", "Laptop/Macbook", "Printer", "Tablet/IPad", "Monitor", "CPU", "TV", "Air Cooler", "Air Fryer", "Guitar", "Others"]
        const locationOptions = ['Maesot', 'Yangon', 'Mandalay', 'Chiang Mai', 'Myawaddy', 'Bangkok', "Samut Sakhon", "Nakhon Phanom", "Phetchaburi", "Ranong", "Nakhon Sawan", "Ratchaburi", "Samut Prakan", "Pathum Thani", "Kantang Trang", "Phuket", "Prachin Buri", "Nonthaburi"];
    
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
    
        const [showOutput, setShowOutput] = useState(false);
    
        const homeDeliveryLocations = {
          Yangon: ["Dala", "Thanlyin", "Hmawbi", "Others", "No Door2Door"],
          Mandalay: ["19 Street, 115 Street x 58 Street, 48 Street", "19 Street, 115 Street x 58 Street, 92 Street", "Others", "No Door2Door"],
          Maesot : ["Hua Fai", "Naung Bwar", "Mae Pa Nuea", "Mae Pa (Moo 1)", "Tambon", "Tambon Tha Sai Lod", "Others", "No Door2Door"]
        };
    
        const transportationCost = useRef();
        const door2doorCost = useRef();
    
        let homeDeliveryCost = `Price`;
        let estimatedCost = `Price`;
    
        const openHelloFacebookLink = () => {
          window.open("https://www.facebook.com/share/1Dsn9K7jrQ/?mibextid=wwXIfrq", "_blank");
        };
    
        useEffect(() => {
          setHomeDeliveryOptions(homeDeliveryLocations[selectedOption2] || []);
        }, [selectedOption2]);
    
        const handleCalculate = () => {
          estimatedCost = "";
          homeDeliveryCost = ""; // Reset cost
    
          if (selectedOption2 === "Yangon") {
            if (["Dala", "Thanlyin", "Hmawbi"].includes(selectedHomeDelivery)) {
              homeDeliveryCost = `(Negotiate for the Door2Door cost)`;
            } else if (selectedHomeDelivery === "Others") {
              if (weight <= 3) {
                homeDeliveryCost = `2500 MMK`;
              } else {
                homeDeliveryCost = `${Math.round(((weight - 3) * 350) + 2500)} MMK`;
              }
            }
          }
        
          else if (selectedOption2 === "Mandalay") {
            if (weight > 10 || (length > 24 && width > 24 && height > 24)) {
              homeDeliveryCost = `(Negotiate for the Door2Door cost)`;
            }
            else {
              if (selectedHomeDelivery === "19 Street, 115 Street x 58 Street, 48 Street") {
                homeDeliveryCost = length > 12 && width > 12 && height > 12 && weight > 3
                  ? `${Math.round(((weight - 3) * 1000) + 3000)} MMK`
                  : `3000 MMK`;
              }
              else if (selectedHomeDelivery === "19 Street, 115 Street x 58 Street, 92 Street") {
                homeDeliveryCost = length > 12 && width > 12 && height > 12 && weight > 3
                ? `${Math.round(((weight - 3) * 1000) + 4000)} MMK`
                : `4000 MMK`;
              }
              else if (selectedHomeDelivery === "Others") {
                homeDeliveryCost = length > 12 && width > 12 && height > 12 && weight > 3
                ? `${Math.round(((weight - 3) * 1000) + 5000)} MMK`
                : `5000 MMK`;
              }
            }
          }
    
          else if (selectedOption2 === "Maesot") {
            if (weight < 100) {
              if (["Hua Fai", "Naung Bwar", "Mae Pa Nuea", "Mae Pa (Moo 1)", "Tambon", "Tambon Tha Sai Lod"].includes(selectedHomeDelivery)) {
                homeDeliveryCost = `฿40`
              }
              else if (selectedHomeDelivery === "Others") {
                homeDeliveryCost = `฿60`
              }
            }
    
            else {
              homeDeliveryCost = `Door2Door Unavailable`
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
    
              else if (weight >= 5.1 && weight <= 100) {
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
    
              else if (weight >= 5.1 && weight <= 100) {
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
    
            else if ([
              "Samut Sakhon", "Nakhon Phanom", "Phetchaburi", "Ranong",
              "Nakhon Sawan", "Ratchaburi", "Samut Prakan", "Pathum Thani",
              "Kantang Trang", "Phuket", "Nonthaburi"
            ].includes(selectedOption2)) {
              if (selectedOption1 === "Maesot") {
                if (weight <= 2) {
                  if (length > 12 || width > 12 || height > 12) {
                    estimatedCost = `Too large for estimation\nClick the link below to negotiate about the full price`
                  }
                  else if (length > 6 || width > 6 || height > 6) {
                    estimatedCost = `฿130\n(฿50 for extra box size)`
                  }
                  else if (length <= 6 || width <= 6 || height <= 6) {
                    estimatedCost = `฿80`
                  }
                }
                if (weight >= 2.1 && weight <= 3) {
                  if ((length > 12 || width > 12 || height > 12)) {
                    estimatedCost = `Too large for estimation\nClick the link below to negotiate about the full price`
                  }
                  else if (length > 8 || width > 8 || height > 8) {
                    estimatedCost = `฿150\n(฿50 for extra box size)`
                  }
                  else if (length <= 8 || width <= 8 || height <= 8) {
                    estimatedCost = `฿100`
                  }
                }
                if (weight >= 3.1 && weight <= 4) {
                  if (length > 18 || width > 18 || height > 18) {
                    estimatedCost = `Too large for estimation\nClick the link below to negotiate about the full price`
                  }
                  else if (length > 12 || width > 12 || height > 12) {
                    estimatedCost = `฿200\n(฿70 for extra box size)`
                  }
                  else if (length <= 12 || width <= 12 || height <= 12){
                    estimatedCost = `฿130`
                  }
                }
                if (weight >= 4.1 && weight <= 10) {
                  if (length > 24 || width > 24 || height > 24) {
                    estimatedCost = `Too large for estimation\nClick the link below to negotiate about the full price`
                  }
                  else if (length <= 24 || width <= 24 || height <= 24) {
                    estimatedCost = `฿${weight * 50}`
                  }
                }
                if (weight > 10) {
                  estimatedCost = `฿${weight * 45}\n(Only using weight)\nClick the link below to negotiate about the full price`
                }
              }
    
              if (selectedOption1 === "Mandalay" || selectedOption1 === "Yangon") {
                if (weight <= 2) {
                  if (length > 12 || width > 12 || height > 12) {
                    estimatedCost = `Too large for estimation\nClick the link below to negotiate about the full price`
                  }
                  else if (length > 6 || width > 6 || height > 6) {
                    estimatedCost = `฿230\n${selectedOption1} - Maesot: ฿150 | Maesot - ${selectedOption2}: ฿80\n(฿50 for extra box size)`
                  }
                  else if (length <= 6 || width <= 6 || height <= 6) {
                    estimatedCost = `฿180\n${selectedOption1} - Maesot: ฿100 | Maesot - ${selectedOption2}: ฿80`
                  }
                }
                if (weight >= 2.1 && weight <= 3) {
                  if ((length > 12 || width > 12 || height > 12)) {
                    estimatedCost = `Too large for estimation\nClick the link below to negotiate about the full price`
                  }
                  else if (length > 8 || width > 8 || height > 8) {
                    estimatedCost = `฿300\n${selectedOption1} - Maesot: ฿200 | Maesot - ${selectedOption2}: ฿100\n(฿50 for extra box size)`
                  }
                  else if (length <= 8 || width <= 8 || height <= 8) {
                    estimatedCost = `฿250\n${selectedOption1} - Maesot: ฿150 | Maesot - ${selectedOption2}: ฿100`
                  }
                }
                if (weight >= 3.1 && weight <= 4) {
                  if (length > 18 || width > 18 || height > 18) {
                    estimatedCost = `Too large for estimation\nClick the link below to negotiate about the full price`
                  }
                  else if (length > 12 || width > 12 || height > 12) {
                    estimatedCost = `฿420\n${selectedOption1} - Maesot: ฿250 | Maesot - ${selectedOption2}: ฿150\n(฿70 for extra box size)`
                  }
                  else if (length <= 12 || width <= 12 || height <= 12){
                    estimatedCost = `฿350\n${selectedOption1} - Maesot: ฿200 | Maesot - ${selectedOption2}: ฿150`
                  }
                }
                if (weight >= 4.1 && weight <= 10) {
                  if (length > 24 || width > 24 || height > 24) {
                    estimatedCost = `Too large for estimation\nClick the link below to negotiate about the full price`
                  }
                  else if (length <= 24 || width <= 24 || height <= 24) {
                    estimatedCost = `฿${weight * 100}\n${selectedOption1} - Maesot: ฿${weight * 50} | Maesot - ${selectedOption2}: ฿${weight * 50}`
                  }
                }
                if (weight > 10) {
                  estimatedCost = `฿${weight * 95}\n${selectedOption1} - Maesot: ฿${weight * 45} | Maesot - ${selectedOption2}: ฿${weight * 50}\n(Only using weight)\nClick the link below to negotiate about the full price`
                }
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
    
          setShowOutput(true);
    
          transportationCost.current.innerText = `${estimatedCost}`;
          door2doorCost.current.innerText = `${homeDeliveryCost}`;
        }
    return (
        <div className="mobile-home">
          <div className={`mobile-input-container ${showOutput ? "slide-out" : ""}`}>
            <div className="mobile-item-with-length">
              <div className="mobile-item-type">
                <h2 className="mobile-item-type-title">Item Type</h2>

                <select
                  className="mobile-item-type-dropdown mobile-dropdown"
                  value={selectedItemOption1}
                  onChange={(e) => setSelectedItemOption(e.target.value)}
                >
                  <option value=""></option>
                  {itemOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              
              {(selectedItemOption1 === "Monitor" || selectedItemOption1 === "TV") && (
                <div className="mobile-device-length-input">
                  <h4 className="mobile-device-length-title">Device Length</h4>
            
                  <InputNumber
                    className="mobile-device-length-input-box"
                    type="number"
                    addonAfter="inches"
                    value={deviceLength}
                    onChange={setDeviceLength}
                    min={0}
                  />
                </div>
              )}
            </div>
          
            {/* From and To dropdowns */}
            <div className="mobile-cities-with-door2door">
              <div className="mobile-location-dropdowns">
                <h2 className="mobile-destinations-title">Destinations</h2>
          
                <div className="mobile-cities">
                  <select
                    className="mobile-from-dropdown mobile-dropdown"
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
                    className="mobile-to-dropdown mobile-dropdown"
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
              </div>
                
              {homeDeliveryOptions.length > 0 && (
                <div className="mobile-home-delivery">
                  <h4 className="mobile-door2door-title">Door2Door</h4>
            
                  <select
                    className="mobile-home-delivery-dropdown mobile-dropdown"
                    value={selectedHomeDelivery}
                    onChange={(e) => setSelectedHomeDelivery(e.target.value)}
                  >
                    <option value=""></option>
                    {homeDeliveryOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          
            {/* Weight input with kg */}
            <div className="mobile-weight-input">
              <h2 className="mobile-weight-tite">Weight</h2>
          
              <InputNumber
                className="mobile-weight-input-box"
                type="number"
                addonAfter="kg"
                value={weight}
                onChange={setWeight}
                min={0}
              />
            </div>
          
            {/* Length, Width, and Height inputs */}
            <div className="mobile-size-input">
              <h2 className="mobile-size-title">Size</h2>

              <div className="mobile-size-input-box">
                <div className="length-and-width">
                  <InputNumber
                    className="mobile-length-input-box"
                    type="number"
                    addonAfter="inches"
                    value={length}
                    onChange={setLength}
                    placeholder="Length"
                    min={0}
                  />
                  <InputNumber
                    className="mobile-width-input-box"
                    type="number"
                    addonAfter="inches"
                    value={width}
                    onChange={setWidth}
                    placeholder="Width"
                    min={0}
                  />
                </div>

                <InputNumber
                  className="mobile-height-input-box"
                  type="number"
                  addonAfter="inches"
                  value={height}
                  onChange={setHeight}
                  placeholder="Height"
                  min={0}
                />
              </div>
            </div>
          
            {/* Calculate button */}
            <div>
              <Button className="mobile-calculate-button" type="primary" shape="round" onClick={handleCalculate}>
                Calculate
              </Button>
            </div>
          </div>
          
          <Divider type="vertical" />
          
          <div className={`mobile-output-container ${showOutput ? "slide-in" : "hidden"}`}>
            <div className="mobile-estimate-cost">
              <Card
                className="mobile-transportation-cost"
                title="Estimated Transportation Cost"
                style={{ border: "2px solid white", width: "400px" }}
              >
                <h4 ref={transportationCost} className="mobile-transportation-cost-text"></h4>
              </Card>
          
              <Card
                className="mobile-door2door-cost"
                title="Estimated Door2Door Cost"
                style={{ border: "2px solid white", width: "400px" }}
              >
                <h4 ref={door2doorCost} className="mobile-door2door-cost-text"></h4>
              </Card>
            </div>
          </div>
        </div>

    );
}
 
export default MobileHome;