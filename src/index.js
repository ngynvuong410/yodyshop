import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initialState,reducer} from './store/Reduce'
import {StateProvider} from './store/StateProvider'
ReactDOM.render(
  <React.StrictMode>
  <StateProvider reducer={reducer} initialstate={initialState}>
  <App />
  </StateProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


