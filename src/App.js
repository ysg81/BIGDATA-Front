import React, { Component } from 'react';
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