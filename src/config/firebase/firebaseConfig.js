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
  apiKey: "AIzaSyDFr1hwabJAwqd7xLLziUUv-XM6LUfpRJc",
  authDomain: "heroes-td-6fa95.firebaseapp.com",
  databaseURL: "https://heroes-td-6fa95-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "heroes-td-6fa95",
  storageBucket: "heroes-td-6fa95.appspot.com",
  messagingSenderId: "506890149448",
  appId: "1:506890149448:web:533667c41a06638fb6c27d",
  measurementId: "G-6T763K8X01"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebase.database()
export default firebase