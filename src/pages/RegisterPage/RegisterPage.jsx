import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import auth from '../../Firebase/Firebase.init';

const RegisterPage = () => {
   const [email, setEmail] = useState({ value: '', error: '' });
   const [password, setPassword] = useState({ value: '', error: '' });
   const [passwordConfirmation, setPasswordConfirmation] = useState({
      value: '',
      error: '',
   });
   const navigate = useNavigate();
   const provider = new GoogleAuthProvider();

   //google auth sign up handling
   const googleAuth = () => {
      signInWithPopup(auth, provider)
         .then((result) => {
            const user = result.user;
            toast.success('Account created', { id: 'created' });
            navigate('/');
         })
         .catch((error) => {
            console.error(error);
         });
   };

   //Email Input Handling
   const handleEmail = (event) => {
      const emailInput = event.target.value;
      if (/\S+@\S+\.\S+/.test(emailInput)) {
         setEmail({ value: emailInput, error: '' });
      } else {
         setEmail({ value: '', error: 'Please Provide a valid Email' });
      }
   };

   //Password Input Handling
   const handlePassword = (event) => {
      const passwordInput = event.target.value;

      if (passwordInput.length < 7) {
         setPassword({ value: '', error: 'Password too short' });
      } else if (!/(?=.*[A-Z])/.test(passwordInput)) {
         setPassword({
            value: '',
            error: 'Password must contain a capital letter',
         });
      } else {
         setPassword({ value: passwordInput, error: '' });
      }
   };

   //Confirm Pass Handling
   const handleConfirmPassword = (event) => {
      const confirmationInput = event.target.value;

      if (confirmationInput !== password.value) {
         setPasswordConfirmation({ value: '', error: 'Password Mismatched' });
      } else {
         setPasswordConfirmation({ value: confirmationInput, error: '' });
      }
   };

   //handle singup form
   const handleSignUp = (e) => {
      console.log('handleSignUp');
      e.preventDefault();
      //handing SignUp empty submit
      if (email.value === '') {
         setEmail({ value: '', error: 'Email is required' });
      }
      if (password.value === '') {
         setPassword({ value: '', error: 'Password is required' });
      }
      if (passwordConfirmation.value === '') {
         setPasswordConfirmation({
            value: '',
            error: 'Password confirmation is required',
         });
      }
      if (email.value && password.value === passwordConfirmation.value) {
         createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
               const user = userCredential.user;
               toast.success('Account created', { id: 'created' });
               //after sign up redirect to home page
               navigate('/');
               verifiedEmail();
            })
            .catch((error) => {
               const errorMessage = error.message;
               if (errorMessage.includes('already-in-use')) {
                  toast.error('Email already in use', { id: 'error' });
               } else {
                  toast.error(errorMessage, { id: 'error' });
               }
            });
      }
   };

   //Verification Email Sending
   const verifiedEmail = () => {
      sendEmailVerification(auth.currentUser).then(() => {
         console.log(auth.currentUser);
      });
   };

   return (
      <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
         {/* <!-- Login component --> */}
         <div className="flex shadow-md">
            {/* <!-- Login banner --> */}
            <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: '24rem', height: '32rem' }}>
               <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="./images/login-1.svg" />
            </div>
            {/* <!-- Login form --> */}
            <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: '24rem', height: '32rem' }}>
               <div className="w-72">
                  {/* <!-- Heading --> */}
                  <h1 className="text-xl font-semibold">Register Account</h1>
                  <small className="text-gray-400">Please signup for buy courses</small>

                  {/* <!-- Form --> */}
                  <form className="mt-4" onSubmit={handleSignUp}>
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
                     <div className="mb-3">
                        <label className="mb-2 block text-xs font-semibold">Password</label>
                        <input required onBlur={handleConfirmPassword} name="confirmPassword" type="password" placeholder="*****" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                        {passwordConfirmation.error && <span className="error">{passwordConfirmation.error}</span>}
                     </div>
                     <div className="mb-3">
                        <button type="submit" className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">
                           Register
                        </button>
                     </div>
                  </form>
                  <button onClick={googleAuth} className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
                     <img className="w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" />
                     Sign up with Google
                  </button>

                  {/* <!-- Footer --> */}
                  <div className="text-center">
                     <span className="text-xs text-gray-400 font-semibold">Don't have account? </span>
                     <button onClick={() => navigate('/login')} className="text-xs font-semibold text-purple-700">
                        Register
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;
