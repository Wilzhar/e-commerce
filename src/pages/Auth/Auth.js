import React from 'react';

const Auth = (props) => {

  return (
    <div className='flex justify-center items-center w-full h-[50em] overflow-hidden my-16'>
      <div className='flex-[0_0_60%] w-full mx-auto h-full'>
        <img className='object-cover w-auto h-full' src='/images/auth-image.jpg' alt='logo' />
      </div>
      <div className='flex-[0_0_40%]'>
        {props.children}
      </div>
    </div>
  );
};

export default Auth;
