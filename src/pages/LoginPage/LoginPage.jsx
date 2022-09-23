import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import auth from '../../Firebase/Firebase.init';

const LoginPage = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState({ value: '', error: '' });
   const [password, setPassword] = useState({ value: '', error: '' });
   // const { pathname } = useLocation()?.state;
   console.log(useLocation());
   const location = useLocation();
   const redirect =  location?.state ? location.state.pathname : '';


   //Google Auth
   const googleAuth = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
         .then((result) => {
            const user = result.user;
            // ...
            console.log(user);
            toast.success('Sign In Successfully', { id: 'signInGoogle' });
            navigate(redirect);
         })
         .catch((error) => {
            // Handle Errors here.
            console.error(error);
         });
   };

   //handle email
   const handleEmail = (event) => {
      const emailInput = event.target.value;

      if (/\S+@\S+\.\S+/.test(emailInput)) {
         setEmail({ value: emailInput, error: '' });
      } else {
         setEmail({ value: '', error: 'Please Provide a valid Email' });
      }
   };

   //handle password
   const handlePassword = (event) => {
      const passwordInput = event.target.value;

      setPassword({ value: passwordInput, error: '' });
   };

   //handle login form with custom email and password
   const handleLogin = (event) => {
      event.preventDefault();

      if (email.value === '') {
         setEmail({ value: '', error: 'Email is required' });
      }

      if (password.value === '') {
         setPassword({ value: '', error: 'Password is required' });
      }

      if (email.value && password.value) {
         signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
               const user = userCredential.user;
               console.log(user);
               toast.success('Sign In Successfully', { id: 'signIn' });
               navigate('/');
            })
            .catch((error) => {
               const errorMessage = error.message;

               if (errorMessage.includes('wrong-password')) {
                  toast.error('Wrong Password', { id: 'error' });
               } else {
                  toast.error(errorMessage, { id: 'error' });
               }
            });
      }
   };

   const handleResetPass = () => {
      sendPasswordResetEmail(auth, email.value)
         .then(() => {
            toast.success('password reset main send');
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
         });
   };

   return (
      // <!-- Container -->
      <div className=" flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
         {/* <!-- Login component --> */}
         <div className="flex shadow-md">
            {/* <!-- Login form --> */}
            <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: '44rem', height: '32rem' }}>
               <div className="w-72">
                  {/* <!-- Heading --> */}
                  <h1 className="text-xl font-semibold">Login Account</h1>
                  <small className="text-gray-400">Welcome back! Please enter your details</small>

                  {/* <!-- Form --> */}
                  <form className="mt-4" onSubmit={handleLogin}>
                     <div className="mb-3">
                        <label className="mb-2 block text-xs font-semibold">Email</label>
                        <input required onBlur={handleEmail} name="email" type="email" placeholder="Enter your email" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                        {email.error && <span className="error">{email.error}</span>}
                     </div>

                     <div className="mb-3">
                        <label className="mb-2 block text-xs font-semibold">Password</label>
                        <input required onBlur={handlePassword} name="password" type="password" placeholder="*****" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                        {password.error && <span className="error">{password.error}</span>}
                     </div>
                     <button onClick={handleResetPass} className="text-xs font-semibold text-purple-700 mb-3">
                        Forget Password
                     </button>
                     <div className="mb-3">
                        <button onClick={handleLogin} type="submit" className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">
                           Sign In
                        </button>
                     </div>
                  </form>
                  <button onClick={googleAuth} className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
                     <img className="w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" />
                     Sign up with Google
                  </button>

                  {/* <!-- Footer --> */}
                  <div className="text-center">
                     <span className="text-xs text-gray-400 font-semibold">Don't have account?</span>
                     <button onClick={() => navigate('/register')} className="text-xs font-semibold text-purple-700">
                        Sign up
                     </button>
                  </div>
               </div>
            </div>

            {/* <!-- Login banner --> */}
            <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: '34rem', height: '32rem' }}>
               <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="./images/register.png" />
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
