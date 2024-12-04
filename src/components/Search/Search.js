import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={clsx('flex justify-center items-center p-2', props.className)}>
      <input
        type="text"
        placeholder="What are you looking for?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full rounded-md p-2 px-4 bg-gray-100 placeholder-gray-400 font-normal text-sm' />

      <button className='ml-[-40px] p-2 rounded-md'>
        <MagnifyingGlassIcon className="size-6 text-black" />
      </button>
    </div>
  );
};

export default Search;
