import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./scss/app.scss";

//https://6531a2474d4c2e3f333d3049.mockapi.io/pizzas

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <NotFound />
        </div>
      </div>
    </div>
  );
}

export default App;
