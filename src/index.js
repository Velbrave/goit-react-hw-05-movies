import React from 'react';
import ReactDOM from 'react-dom/client';
import  App  from 'components/pped/App';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/goit-react-hw-05-movies">
      <App />
      <ToastContainer/> 
      </BrowserRouter>
  </React.StrictMode>
);

