import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
 import {positions , transitions , Provider as AlertProvider} from "react-alert";
 import AlertTemplate from "react-alert-template-basic";

import App from './App';
import store from './Store';

 
const root = ReactDOM.createRoot(document.getElementById('root'));
       
const options ={
   timeout:5000,
   position:positions.TOP_CENTER,
   transition:transitions.SCALE     //FADE
        }
 

        
      root.render(
          <Fragment>
      <Provider store={store}>
     <AlertProvider template={AlertTemplate} {...options}>
            <App />
     </AlertProvider>
     </Provider>
     </Fragment>
  );
