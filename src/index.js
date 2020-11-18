import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as firebase from 'firebase'

import store from './redux/'
import { Provider } from 'react-redux'

const firebaseConfig = {
  apiKey: "AIzaSyCd-wcmlECO7HEodjXrkw-cieFK4oBQTxY",
  authDomain: "triple-bonito-281307.firebaseapp.com",
  databaseURL: "https://triple-bonito-281307.firebaseio.com",
  projectId: "triple-bonito-281307",
  storageBucket: "triple-bonito-281307.appspot.com",
  messagingSenderId: "1081754289708",
  appId: "1:1081754289708:web:8b917676ec602dec243389"
}

firebase.default.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
