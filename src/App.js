import React, { useState, useEffect } from "react";
import Header from "./header.js";
import Home from "./home.js";
import SmallerHome from "./smallerHome.js";
import MobileHome from "./mobileHome.js";

const App = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  return (
    <div className="app">
      <Header {...props} />

      {windowWidth > 1000 ? (
        <>
          <Home {...props} />
        </>
      ) : windowWidth > 700 ? (
        <>
          <SmallerHome {...props} />
        </>
      ) : (
        <>
          <MobileHome {...props} />
        </>
      )}
    </div>
  );
};

export default App;
