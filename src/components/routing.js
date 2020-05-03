import React, { Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import App from '../App';
import {CookiesProvider} from 'react-cookie';

class Routing extends Component{

    render(){
        return(
         <Router>
         <CookiesProvider>
         <Switch>
         <Route exact path="/" component={App}/> 
         <Redirect from="/logout" to="/"/>      
         </Switch>
         </CookiesProvider>
         </Router>
      )
    }
}

export default Routing;