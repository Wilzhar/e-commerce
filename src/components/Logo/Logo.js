import React from 'react';
import clsx from 'clsx';

const Logo = (props) => {

  return (
    <div className={clsx('', props.className)}>
      <h1 className='text-2xl font-bold'>Exclusive</h1>
    </div>
  );
};

export default Logo;
