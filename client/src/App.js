import React,{Component} from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import login from './components/auth/login';
import Register from './components/auth/register';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Router>
        <Navbar></Navbar>
        <div>

          <Route exact path="/" component={Landing}></Route>
           
           <div className="container">

           <Route exact path="/register" component={Register}></Route>
           <Route exact path="/login" component={login}></Route>



           </div>

        </div>
        
        <Footer></Footer>
        </Router>
        
      </div>
    );
  }
  
}

export default App;
