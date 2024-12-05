import { useState } from 'react';
import clsx from 'clsx';

const InputIcon = ({ className, children, placeholder, inputStyle }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div
      className={clsx(
        'flex justify-center items-center p-0 m-0',
        className
      )}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={clsx('pr-10', inputStyle)} />

      <button className='ml-[-40px] p-2 rounded-md'>
        {children}
      </button>
    </div>
  );
};

export default InputIcon;
