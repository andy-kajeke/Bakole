import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderBar from './components/header/headerBar';
import Footer from './components/header/footer';

function App() {
  return (
    <div className="App">
       <HeaderBar/>
      {/* Side navigation  */}
        <div class="sidenav">
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>

       {/* Page content  */}
        <div class="main">
  
        </div>
    </div>
  );
}

export default App;
