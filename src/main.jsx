import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import firebaseConfig from './firebase.config.js'
import store from './store.js'
import { Context } from './Componat/Context.jsx'


if (import.meta.env.DEV) {
  // Show big red "Stop!" message in console
  console.log('%cStop!', 'color: red; font-size: 40px; font-weight: bold;');

  // Filter React Router warnings
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("React Router Future Flag Warning")
    ) {
      // ignore React Router Future Flag Warning
      return;
    }
    originalWarn(...args);
  };
}


createRoot(document.getElementById('root')).render(
    <Context>
    <Provider store={store}>
    <App />
    </Provider>
    </Context>
)