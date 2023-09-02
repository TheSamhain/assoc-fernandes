// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCAGXgKxJqCR-mQz9DXtXA_4CIGhLsKPW4',
  authDomain: 'assoc-fernandes-karate.firebaseapp.com',
  projectId: 'assoc-fernandes-karate',
  storageBucket: 'assoc-fernandes-karate.appspot.com',
  messagingSenderId: '375857408786',
  appId: '1:375857408786:web:b9ba95b54d405f4cd4e1cb',
  measurementId: 'G-20F7Z37WFR',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);

// Initialize Cloud Storage and get a reference to the service
export const firebaseStorage = getStorage(firebaseApp);
