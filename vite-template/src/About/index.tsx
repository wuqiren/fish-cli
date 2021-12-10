import '../App.css';

import { Button } from 'antd';

import logo from '../fish.png';
const About = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        About
        <Button
          onClick={() => {
            window.history.go(-1);
          }}>
          GoBack
        </Button>
      </header>
    </div>
  );
};

export default About;
