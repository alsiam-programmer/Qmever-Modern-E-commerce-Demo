import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from "react-redux";
import store from './store.js';
import { Context } from './Componat/Context.jsx';
import firebaseConfig from './firebase.config.js';

createRoot(document.getElementById('root')).render(
  <Context>
    <Provider store={store}>
      <App />
    </Provider>
  </Context>
);
