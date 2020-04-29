import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/login_overlay.css';
import './css/style6.css';
import './css/shop.css';
import './css/owl.theme.css';
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Routing from './components/routing';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
