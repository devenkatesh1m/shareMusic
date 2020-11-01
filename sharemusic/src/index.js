import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import GodComponent from './components/GodComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import fire from './config/fire';
ReactDOM.render(
  <React.StrictMode>
    <GodComponent />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
