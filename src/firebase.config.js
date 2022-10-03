// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDIHEZWBVRx0J15srTlnJu9-LYeEf_Y9Rc",
	authDomain: "house-marketplace-f4092.firebaseapp.com",
	projectId: "house-marketplace-f4092",
	storageBucket: "house-marketplace-f4092.appspot.com",
	messagingSenderId: "455906335667",
	appId: "1:455906335667:web:497c89b2b786339e2f89c6",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
