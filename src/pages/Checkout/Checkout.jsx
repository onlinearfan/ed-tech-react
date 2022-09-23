import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../Firebase/Firebase.init';
import courses from '../../data/course-data';
import toast from 'react-hot-toast';

const Checkout = () => {
   const [currentUser, setCurrentUser] = useState({});
   const courseId = useParams()?.courseId;
   const orderedCourse = courses.find((course) => course.id === courseId);

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

   const confirmOrder = () => {
      toast('Thanks for ordering our course!!');
   };

   return (
      <div>
         <div className="flex justify-center px-6 my-12">
            {/* <!-- Row --> */}
            <div className="w-full xl:w-3/4 lg:w-11/12 flex md:flex-row flex-col items-center">
               {/* <!-- Col --> */}
               <div className="w-full h-auto  lg:block lg:w-5/12 bg-cover rounded-l-lg">
                  <div className="bg-gray-100 p-6 rounded-lg">
                     <img className="h-40 rounded w-full object-cover object-center mb-6" src={orderedCourse?.image} alt="content" />
                     <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{orderedCourse?.category}</h3>
                     <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{orderedCourse?.title}</h2>
                     <p className="leading-relaxed text-base">{orderedCourse?.description}</p>
                     <button className="btn bg-blue-700 text-white py-1 px-4 mt-4">{orderedCourse?.price}</button>
                  </div>
               </div>
               {/* <!-- Col --> */}
               <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                  <h3 className="pt-4 text-2xl text-center">Confirm Order!</h3>
                  <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                     <div className="mb-4 md:flex md:justify-between"></div>
                     <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
                           Your Name
                        </label>
                        <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" disabled value={currentUser?.displayName} id="name" type="name" placeholder="your name" />
                     </div>
                     <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                           Email
                        </label>
                        <input disabled value={currentUser?.email} className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                     </div>
                     <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                           <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="Type Your Account Number">
                              Account Id
                           </label>
                           <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                           <p className="text-xs italic text-red-500">Please give your account id to buy course.</p>
                        </div>
                        <div className="md:ml-2">
                           <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                              Confirm Account Id
                           </label>
                           <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="c_password" type="password" placeholder="******************" />
                        </div>
                     </div>
                     <div className="mb-6 text-center">
                        <button onClick={confirmOrder} className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                           Order Confirmed
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Checkout;
