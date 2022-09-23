import React from 'react';
import SingleBlog from './SingleBlog/SingleBlog';
import blogs from '../../data/blog-data';
import { useLocation } from 'react-router';

const Blogs = () => {
   const isTruePath = useLocation().pathname == '/blogs';
   return (
      <section className="text-gray-600 body-font">
         <div className={isTruePath ? 'py-24 container m-auto lg:w-10/12 w-full' : 'py-24'}>
            {/* title */}
            <div className="flex flex-wrap w-full mb-20 px-4">
               <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Our Blogs</h1>
                  <div className="h-1 w-20 bg-indigo-500 rounded"></div>
               </div>
            </div>
            {/* blogs */}
            <div className="flex flex-wrap -m-4">{blogs.length > 0 && blogs.map((blog) => <SingleBlog key={blog.id} blog={blog} />)}</div>
         </div>
      </section>
   );
};

export default Blogs;
