import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4qHXifomtZl3M4RCYjoe2RJJBwN-Wf8c",
  authDomain: "netflixclone2-3f2ac.firebaseapp.com",
  projectId: "netflixclone2-3f2ac",
  storageBucket: "netflixclone2-3f2ac.appspot.com",
  messagingSenderId: "670112402323",
  appId: "1:670112402323:web:4e7ae257bdbdb416aeb666"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
