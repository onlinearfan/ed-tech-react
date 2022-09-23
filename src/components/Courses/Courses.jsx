import React from 'react';
import SingleCourse from './SingleCourse/SingleCourse';
import courses from '../../data/course-data';
import { useLocation } from 'react-router';

const Courses = () => {
   const isTruePath = useLocation().pathname == '/courses';
   return (
      <div>
         <section className="text-gray-600 body-font">
            <div className={isTruePath ? 'py-24 container m-auto lg:w-10/12 w-full' : 'py-24'}>
               <div className="flex flex-wrap w-full mb-20 px-4">
                  <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                     <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Our Courses</h1>
                     <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                  </div>
               </div>
               <div className="flex flex-wrap">{courses.length > 0 && courses.map((course) => <SingleCourse key={course.id} course={course} />)}</div>
            </div>
         </section>
         {/* <SingleCourse/> */}
      </div>
   );
};

export default Courses;
