import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from './components/MainPage';
import Sidebar from "./components/Sidebar";

class App extends Component {
  render() {
    return (
      <div className="App">
                <Sidebar/>
        <MainPage/>
      </div>
    );
  }  
}

export default App;