import "./smallerStyle.css"
import React, { useRef, useState, useEffect } from 'react';
import { Button, Card, InputNumber} from 'antd';

import { db } from "./firebase"; // Correctly import db
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


const SmallerHome = () => {
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

    const [isDoor2DoorChecked, setIsDoor2DoorChecked] = useState(false);
    const [isPickupChecked, setIsPickupChecked] = useState(false);
    const [selectedPickup, setSelectedPickup] = useState("");

    const [showOutput, setShowOutput] = useState(false);

    const homeDeliveryLocations = {
      Yangon: ["Dala", "Thanlyin", "Hmawbi", "Others"],
      Mandalay: ["19 Street, 115 Street x 58 Street, 48 Street", "19 Street, 115 Street x 58 Street, 92 Street", "Others"],
      Maesot : ["Hua Fai", "Naung Bwar", "Mae Pa Nuea", "Mae Pa (Moo 1)", "Tambon", "Tambon Tha Sai Lod", "Others"]
    };

    const transportationCost = useRef();
    const door2doorCost = useRef();

    let homeDeliveryCost = `Price`;
    let pickupCost = `Price`;
    let estimatedCost = `Price`;

    const openHelloFacebookLink = () => {
      window.open("https://www.facebook.com/share/1Dsn9K7jrQ/?mibextid=wwXIfrq", "_blank");
    };

    useEffect(() => {
      setHomeDeliveryOptions(homeDeliveryLocations[selectedOption2] || []);
    }, [selectedOption2]);

    useEffect(() => {
      if (homeDeliveryOptions.length === 0) {
      setIsPickupChecked(false);
      setIsDoor2DoorChecked(false);
      setSelectedPickup(""); 
      setSelectedHomeDelivery("");
      }
    }, [homeDeliveryOptions]);  

    const handleCalculate = async () => {
      estimatedCost = "";
      homeDeliveryCost = ""; // Reset cost
      pickupCost = "";
      
      if (selectedOption1 === "Yangon") {
        if (["Dala", "Thanlyin", "Hmawbi"].includes(selectedPickup)) {
          pickupCost = `(Negotiate for the Pickup cost)`;
        } else if (selectedPickup === "Others") {
          if (weight <= 3) {
            pickupCost = `2500 MMK`;
          } else {
            pickupCost = `${Math.round(((weight - 3) * 350) + 2500)} MMK`;
          }
        }
      }
      
      else if (selectedOption1 === "Mandalay") {
        if (weight > 10 || (length > 24 && width > 24 && height > 24)) {
          pickupCost = `(Negotiate for the Pickup cost)`;
        }
        else {
          if (selectedPickup === "19 Street, 115 Street x 58 Street, 48 Street") {
            pickupCost = length > 12 && width > 12 && height > 12 && weight > 3
              ? `${Math.round(((weight - 3) * 1000) + 3000)} MMK`
              : `3000 MMK`;
          }
          else if (selectedPickup === "19 Street, 115 Street x 58 Street, 92 Street") {
            pickupCost = length > 12 && width > 12 && height > 12 && weight > 3
              ? `${Math.round(((weight - 3) * 1000) + 4000)} MMK`
              : `4000 MMK`;
          }
          else if (selectedPickup === "Others") {
            pickupCost = length > 12 && width > 12 && height > 12 && weight > 3
              ? `${Math.round(((weight - 3) * 1000) + 5000)} MMK`
              : `5000 MMK`;
          }
        }
      }
      
      else if (selectedOption1 === "Maesot") {
        if (weight < 100) {
          if (["Hua Fai", "Naung Bwar", "Mae Pa Nuea", "Mae Pa (Moo 1)", "Tambon", "Tambon Tha Sai Lod"].includes(selectedPickup)) {
            pickupCost = `฿40`;
          }
          else if (selectedPickup === "Others") {
            pickupCost = `฿60`;
          }
        } else {
          pickupCost = `Pickup Unavailable`;
        }
      }
    
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
      door2doorCost.current.innerText = `Pickup:\n${pickupCost}\n\nDoor2Door:\n${homeDeliveryCost}`;

      const data = {
        deviceLength: deviceLength,
        dropoff: setHomeDeliveryOptions,
        from: selectedOption1,
        height: height,
        itemType: selectedItemOption1,
        kg: weight,
        length: length,
        pickup: selectedPickup,
        to: selectedOption2,
        width: width,
      };
      
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString(); // "2025"
      const currentMonth = currentDate.toLocaleString("en-US", { month: "long" }).toLowerCase(); // "march", "april", etc.
    
      const docRef = doc(db, currentYear, currentMonth);
    
      try {
        const docSnapshot = await getDoc(docRef);
    
        if (docSnapshot.exists()) {
          const mapValue = docSnapshot.data().map || 0;
    
          await updateDoc(docRef, {
            map: mapValue + 1,
            [`entries.${mapValue + 1}`]: data,
          });
        } else {
          await setDoc(docRef, {
            map: 1,
            entries: { 1: data },
          });
        }
    
        console.log("Data stored successfully!");
      } catch (error) {
        console.error("Error storing data: ", error);
      }
    };

    return (
        <div className="smaller-home">
          <div className={`smaller-input-container ${showOutput ? "slide-out" : ""}`}>
            <div className="smaller-item-with-length">
              <div className="smaller-item-type">
                <h2 className="smaller-item-type-title">Item</h2>

                <select
                  className="smaller-item-type-dropdown smaller-dropdown"
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
                <div className="smaller-device-length-input">
                  <h4 className="smaller-device-length-title">Device Length</h4>
            
                  <InputNumber
                    className="smaller-device-length-input-box"
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
            <div className="smaller-cities-with-door2door">
              <div className="smaller-location-dropdowns">
                <h2 className="smaller-destinations-title">Destinations</h2>
          
                <div className="smaller-cities">
                  <select
                    className="smaller-from-dropdown smaller-dropdown"
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
                    className="smaller-to-dropdown smaller-dropdown"
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
          <div className="smaller-home-delivery-options">
            {/* Checkboxes and dropdowns grouped together */}
            <div className="smaller-checkbox-dropdown-container">

              {/* Pickup Checkbox and Dropdown */}
              <div className="smaller-checkbox-dropdown">
                <input
                  type="checkbox"
                  id="pickup"
                  checked={isPickupChecked}
                  onChange={() => {
                    setIsPickupChecked(!isPickupChecked);
                    if (isPickupChecked) {
                      setSelectedPickup(""); // Reset dropdown value when unchecked
                    }
                  }}
                />
                <label htmlFor="pickup"><h4>Pickup</h4></label>
                
                {isPickupChecked && homeDeliveryOptions.length > 0 && selectedOption1 && (
                  <div className="smaller-pickup-location">
                    <select
                      className="smaller-pickup-dropdown dropdown"
                      value={selectedPickup}
                      onChange={(e) => setSelectedPickup(e.target.value)}
                    >
                      <option value=""></option>
                      {homeDeliveryLocations[selectedOption1]?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              
              {/* Door2Door Checkbox and Dropdown */}
              <div className="smaller-checkbox-dropdown">
                <input
                  type="checkbox"
                  id="door2door"
                  checked={isDoor2DoorChecked}
                  onChange={() => {
                    setIsDoor2DoorChecked(!isDoor2DoorChecked);
                    if (isDoor2DoorChecked) {
                      setSelectedHomeDelivery(""); // Reset dropdown value when unchecked
                    }
                  }}
                />
                <label htmlFor="door2door"><h4>Door2Door</h4></label>
                
                {isDoor2DoorChecked && homeDeliveryOptions.length > 0 && selectedOption2 && (
                  <div className="smaller-home-delivery">
                    <select
                      className="smaller-home-delivery-dropdown dropdown"
                      value={selectedHomeDelivery}
                      onChange={(e) => setSelectedHomeDelivery(e.target.value)}
                    >
                      <option value=""></option>
                      {homeDeliveryLocations[selectedOption2]?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        )}
            </div>
          
            {/* Weight input with kg */}
            <div className="smaller-weight-input">
              <h2 className="smaller-weight-tite">Weight</h2>
          
              <InputNumber
                className="smaller-weight-input-box"
                type="number"
                addonAfter="kg"
                value={weight}
                onChange={setWeight}
                min={0}
              />
            </div>
          
            {/* Length, Width, and Height inputs */}
            <div className="smaller-size-input">
              <h2 className="smaller-size-title">Size</h2>
          
              <div className="smaller-size-input-box">
                <InputNumber
                  className="smaller-length-input-box"
                  type="number"
                  addonAfter="inches"
                  value={length}
                  onChange={setLength}
                  placeholder="Length"
                  min={0}
                />
                <InputNumber
                  className="smaller-width-input-box"
                  type="number"
                  addonAfter="inches"
                  value={width}
                  onChange={setWidth}
                  placeholder="Width"
                  min={0}
                />
                <InputNumber
                  className="smaller-height-input-box"
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
              <Button className="smaller-calculate-button" type="primary" shape="round" onClick={handleCalculate}>
                Calculate
              </Button>
            </div>
          </div>
          
          <div className={`smaller-output-container ${showOutput ? "slide-in" : "hidden"}`}>
            <div className="smaller-estimate-cost">
              <Card
                className="smaller-transportation-cost"
                title="Estimated Transportation Cost"
                style={{ border: "2px solid white", width: "400px" }}
              >
                <h4 ref={transportationCost} className="smaller-transportation-cost-text"></h4>
              </Card>
          
              <Card
                className="smaller-door2door-cost"
                title="Estimated Door2Door Cost"
                style={{ border: "2px solid white", width: "400px" }}
              >
                <h4 ref={door2doorCost} className="smaller-door2door-cost-text"></h4>
              </Card>
            </div>

            <div className="smaller-recalculate-button">
              <Button className="smaller-recalculate-button" type="primary" shape="round" onClick={() => setShowOutput(false)}>
                Re-Calculate
              </Button>
            </div>
          </div>
          
          {/*<button
            className="smaller-hello-facebook-link-button"
            onClick={openHelloFacebookLink}
          > 
            <span class="smaller-icon"><svg xmlns="http://www.w3.org/2000/svg" width="33" viewBox="0 0 512 512" height="33"><g fill-rule="evenodd" clip-rule="evenodd"><path fill="#3a5ba2" d="m256.23 512c140.58 0 255.77-115.19 255.77-255.77 0-141.046-115.19-256.23-255.77-256.23-141.046 0-256.23 115.184-256.23 256.23 0 140.58 115.184 255.77 256.23 255.77z"></path><path fill="#fff" d="m224.023 160.085c0-35.372 28.575-63.946 63.938-63.946h48.072v63.946h-32.199c-8.608 0-15.873 7.257-15.873 15.873v32.192h48.072v63.938h-48.072v144.22h-63.938v-144.22h-48.065v-63.938h48.065z"></path></g></svg></span>
            <span class="smaller-text1">Hello Logistics Thailand</span>
            <span class="smaller-text2">Click to contact us!!</span> 
        </button>*/}
        </div>
    );
}
 
export default SmallerHome;