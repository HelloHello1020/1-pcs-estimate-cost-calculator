import React from "react";
import Header from "./header.js";
import Home from "./home.js";
import SmallerHome from "./smallerHome.js";
import MobileHome from "./mobileHome.js";

const App = (props) => {
  return (
    <div className="app">
      {window.innerWidth > 1000 ? (
        <>
          <Header {...props} />
          <Home {...props} />
        </>
      ) : window.innerWidth > 700 ? ( // Missing '?' was added here
        <>
          <Header {...props} />
          <SmallerHome {...props} />
        </>
      ) : (
        <>
          <Header {...props} />
          <MobileHome {...props} />
        </>
      )}
    </div>
  );
};
export default App;
