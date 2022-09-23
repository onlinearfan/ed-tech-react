import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './Firebase/Firebase.init';
import { useLocation } from 'react-router';

const RequireAuth = ({ children }) => {
   const [currentUser, setCurrentUser] = useState({});
   const navigate = useNavigate();
   const { pathname, state } = useLocation();
   const sendState = {
      pathname,
      courseId: state?.courseId,
   };

   //current user set up
   useEffect(() => {
      const user = onAuthStateChanged(auth, (user) => {
         if (user) {
            setCurrentUser(user);
         } else {
            setCurrentUser({});
         }
      });

      return () => user;
   }, []);

   // console.log(location);
   if (!currentUser.uid) {
      navigate('/login', { state: sendState });
   }

   return children;
};

export default RequireAuth;
