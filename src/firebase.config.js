import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAUiRjQwcIDRiNkj_JusiTpOKJFmat1J-w",
  authDomain: "qmever.com", // safe to use for both qmever.com and www.qmever.com
  databaseURL: "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qmever",
  storageBucket: "qmever.firebasestorage.app",
  messagingSenderId: "527170940876",
  appId: "1:527170940876:web:1f3fb31600c5a009387769"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
export default firebaseConfig;
