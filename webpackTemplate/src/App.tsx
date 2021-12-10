import React from "react";
import Banner from "./imgs/fish.jpeg";
import "./App.less";
const Index = () => {
  return (
    <div className="app">
      <img src={Banner} />
      <h3>欢迎使用fish-cli</h3>
    </div>
  );
};
export default Index;
