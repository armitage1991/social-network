import React,{Component} from 'react';
import {Provider} from 'react-redux';
import PrivateRoute from './components/common/PrivateRoute'
import store from './store';
import './App.css';
import DashBoard from './components/dashboard/dashboard'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import login from './components/auth/login';
import Register from './components/auth/register';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser, logoutUser} from './actions/authActions'
import { clearCurrentProfile } from './actions/profileAction';

// check for token

if(localStorage.jwtToken){
  // set auth token header auth

  setAuthToken(localStorage.jwtToken);

  // decode token and get user info and exp

  const decoded = jwt_decode(localStorage.jwtToken);

  // set user and isauthenticated

  store.dispatch(setCurrentUser(decoded));

  // check for expired token

  const currentTime = Date.now() / 1000 ;

  if(decoded.exp< currentTime){
    // Logout the user
    store.dispatch(logoutUser);

    // clear the current profile
    // redirect to login

    store.dispatch(clearCurrentProfile);

    window.location.href = '/login';
  }
}

class App extends Component {
  render(){
    return (
      <Provider store={store}>
      <div className="App">
        <Router>
        <Navbar></Navbar>
        <div>

          <Route exact path="/" component={Landing}></Route>
           
           <div className="container">

           <Route exact path="/register" component={Register}></Route>
           <Route exact path="/login" component={login}></Route>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={DashBoard}></PrivateRoute>
          </Switch>



           </div>

        </div>
        
        <Footer></Footer>
        </Router>
        
      </div>
      </Provider>
    );
  }
  
}

export default App;
