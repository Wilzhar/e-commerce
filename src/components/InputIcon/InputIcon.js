import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const InputIcon = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div
      className={clsx(
        'flex justify-center items-center p-0 w-full m-0',
        props.className
      )}>
      <input
        type="text"
        placeholder="Enter your email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='rounded-md p-2 text-white placeholder-gray-500 bg-black outline-none border-2 border-[1px]' />

      <button className='ml-[-40px] p-2 rounded-md'>
        <PaperAirplaneIcon className="size-6 text-white" />
      </button>
    </div>
  );
};

export default InputIcon;
