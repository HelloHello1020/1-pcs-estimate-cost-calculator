
import React from "react";
import Header from "./header.js";
import Home from "./home.js";

const App = (props) => {
  return (
    <div className="app">
      <Header {...props} />
      <Home {...props} />
    </div>
  );
};

export default App;
