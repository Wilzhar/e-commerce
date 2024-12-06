import React from 'react';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const NotFound = () => {
  return (
    <div>
      <Header />
      <div className='mx-8 2xl:w-[1536px] 2xl:mx-auto 2xl:my-0 min-h-[400px] mt-8 2xl:mt-16'>
        <Breadcrumb>
          <Link to="/">Home</Link>
          <p>404 Error</p>
        </Breadcrumb>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-[4em] lg:text-[8em] font-normal text-center">404 Not Found</h1>
          <p className="text-center">Page not found</p>
          <Link to="/" className="base-button link-style w-[12em]">
            Back to home page
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
