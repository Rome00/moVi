import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
  browserPopupRedirectResolver,
  debugErrorMap,
  initializeAuth,
} from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBZCTDdM43AhQ31JGUclLRNCIiVx5GQ5PM',
  authDomain: 'movi-90748.firebaseapp.com',
  projectId: 'movi-90748',
  storageBucket: 'movi-90748.appspot.com',
  messagingSenderId: '1062941026327',
  appId: '1:1062941026327:web:ac36d48d1b6801fe4ed452',
  measurementId: 'G-NZE291TMGG',
};
const app: FirebaseApp = initializeApp(firebaseConfig);

const auth: Auth = initializeAuth(app, {
  errorMap: debugErrorMap,
  popupRedirectResolver: browserPopupRedirectResolver,
});

const db: Firestore = getFirestore(app);

export { db, auth };
