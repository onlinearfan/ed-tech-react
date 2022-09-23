import React from 'react';
import Banner from '../../components/Banner/Banner';
import Blogs from '../../components/Blogs/Blogs';
import Courses from '../../components/Courses/Courses';
import Footer from '../../components/Footer/Footer';
import Contact from '../Contact/Contact';

const Home = () => {
   return (
      <>
         <div className="container mx-auto w-full md:w-10/12">
            {/* header,banner,footer,courses,blogs,testimonial,contact */}
            <Banner />
            <Courses />
            <Blogs />
            <Contact />
            <Footer />
         </div>
      </>
   );
};

export default Home;
