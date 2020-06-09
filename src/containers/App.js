
import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';


import Home from '../Components/Home';
import Board from '../Components/Main-board';
import Nav from '../Components/Nav';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className= "App">
        <Router>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/board" component={Board} />
        </Router>
      </div>
    )
  }
}

export default App;
