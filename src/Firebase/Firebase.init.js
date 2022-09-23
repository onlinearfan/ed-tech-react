// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyDmkafKdogZFX3eHDJM8H-gb2OnT-VCHxQ',
   authDomain: 'ed-tech-course-web.firebaseapp.com',
   projectId: 'ed-tech-course-web',
   storageBucket: 'ed-tech-course-web.appspot.com',
   messagingSenderId: '180325717833',
   appId: '1:180325717833:web:cfe2d16e4d19b562d26c98',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
