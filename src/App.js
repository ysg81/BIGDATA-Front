import React, { Component } from 'react';
import MainPage from './components/MainPage';
import Sidebar from "./components/Sidebar";
import imgA from './img/movie.png';

const imagestyle = {
  width: "100%",
  height: "100%",  
  overflow : "auto",
  };

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar/>
        <img src={imgA} style = {imagestyle}></img>
        <MainPage/>
      </div>
    );
  }  
}

export default App;