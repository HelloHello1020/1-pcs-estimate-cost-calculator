import React from "react";
import Header from "./header.js";
import Home from "./home.js";

const App = (props) => {
  return (
    <div className="app">
      {window.innerWidth > 1000 ? (
        <>
          <Header {...props} />
          <Home {...props} />
        </>
      ) : (
        <smallerHome {...props} />
      )}
    </div>
  );
};

export default App;
