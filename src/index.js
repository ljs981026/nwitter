import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { HashRouter } from 'react-router-dom';
import "style/common.css";
import "style/Auth.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter base="/">
    <App />
  </HashRouter>
);

