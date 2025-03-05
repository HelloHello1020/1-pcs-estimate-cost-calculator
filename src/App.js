import React from "react";
import Header from "./header.js";
import Home from "./home.js";
import SmallerHome from "./smallerHome.js";

const App = (props) => {
  return (
    <div className="app">
      {window.innerWidth > 1000 ? (
        <>
          <Header {...props} />
          <Home {...props} />
        </>
      ) : (
        <>
          <Header {...props} />
          <SmallerHome {...props} />
        </>
      )}
    </div>
  );
};

export default App;
