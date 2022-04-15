// Import the functions you need from the SDKs you need
import {getAnalytics} from 'firebase/analytics'
import firebase from 'firebase/app'
import 'firebase/auth'
import * as data from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuz997RkVI1-sbePeQCVlNwiXW8i-NdEk",
  authDomain: "organic-service-341708.firebaseapp.com",
  databaseURL: "https://organic-service-341708-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "organic-service-341708",
  storageBucket: "organic-service-341708.appspot.com",
  messagingSenderId: "365118322152",
  appId: "1:365118322152:web:db5aebfdd5de0ea09f205d",
  measurementId: "G-DYHQTNTTN0"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebase.database()
export default firebase