import React from 'react';
import './App.css';
import Todo from './components/todoApp/Todo';
import DataRender from './components/dataTable/DataRender';
import{Route ,BrowserRouter as Router } from 'react-router-dom';
// import Home from './components/Home';
 import DataList from './components/dataTable/DataList';
import AvailableVehicle from './components/vehicleBooking/AvailableVehicle';
import Home from './components/Home';
import HTree from './components/tree/HTree';

function App() {
  return (
    <div className="App">
       <Router>
       <Route path="/" exact component={Home}/>
       <Route path="/todo" exact component={Todo}/>
        <Route path="/datarender" exact component={DataRender}/>
        <Route path="/datalist" exact component={DataList}/>
        <Route path="/avail" exact component={AvailableVehicle}/>
        <Route path="/tree" exact component ={HTree}/>
        </Router>  
    </div>
  );
}

export default App;
