import React from 'react';
import clsx from 'clsx';

const Logo = (props) => {

  return (
    <div className={clsx('', props.className)}>
      <h1 className='font-bold text-2xl'>Exclusive</h1>
    </div>
  );
};

export default Logo;
