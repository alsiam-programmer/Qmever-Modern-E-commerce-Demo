import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from "react-redux";
import firebaseConfig from './firebase.config.js';
import store from './store.js';
import { Context } from './Componat/Context.jsx';

// Dev mode only
if (import.meta.env.DEV) {
  console.log('%cStop!', 'color: red; font-size: 40px; font-weight: bold;');

  // Filter React Router warnings
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("React Router Future Flag Warning")) {
      return;
    }
    originalWarn(...args);
  };

  // DevTools detection & block
  const blockDevTools = () => {
    const start = new Date();
    debugger; // Triggers pause if console is open
    const end = new Date();
    if (end - start > 100) {
      document.documentElement.innerHTML = '';
      document.write(`
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; background:#000; color:#f00; font-family:sans-serif;">
          <h1 style="font-size:50px; margin-bottom:20px;">ACCESS BLOCKED</h1>
          <p style="font-size:20px;">Console খোলার কারণে আপনার এক্সেস বন্ধ করা হয়েছে।</p>
        </div>
      `);
      window.stop(); // Stop further loading
      throw new Error("Console detected - app blocked!");
    }
  };

  setInterval(blockDevTools, 500); // Check every 0.5 second
}


createRoot(document.getElementById('root')).render(
  <Context>
    <Provider store={store}>
      <App />
    </Provider>
  </Context>
);
