import React, { Component } from 'react';
import MainPage from './components/MainPage';
import Sidebar from "./components/Sidebar";

const imagestyle = {
  width: "100%",
  height: "100%",  
  overflow : "auto",
  };

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <img src="/img/movie.png" style={imagestyle} />
        <MainPage />
      </div>
    );
  }  
}

export default App;