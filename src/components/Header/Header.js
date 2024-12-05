import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Components
import Logo from '../Logo/Logo';
import InputIcon from '../InputIcon/InputIcon';

const selectedPathStyle = 'border-gray-300';

const Header = () => {
  let { pathname } = useLocation()

  const getLinkClass = (path) =>
    clsx('border-b-2 hover:border-gray-200', pathname === path ? selectedPathStyle : 'border-white');

  return (
    <header data-testid="header-component" className="flex items-center justify-center w-full h-24 border-b-2 border-gray-200">
      <div className='2xl:w-[1536px] 2xl:mx-auto 2xl:my-0 mt-4 flex justify-center items-center w-full'>
        <Logo className='flex-1' />
        <nav className="flex-1">
          <ul className="flex items-center justify-center gap-x-8">
            <li className={getLinkClass('/')}>
              <Link to="/">Home</Link>
            </li>
            <li className={getLinkClass('/contact')}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className={getLinkClass('/about')}>
              <Link to="/about">About</Link>
            </li>
            <li className={getLinkClass('/login')}>
              <Link to="/dashboard">Login</Link>
            </li>
          </ul>
        </nav>

        <div className='flex justify-end flex-1'>
          <InputIcon className='w-[17rem]' placeholder="What are you looking for?" inputStyle='w-full p-2 px-4 text-sm font-normal placeholder-gray-400 bg-gray-100 rounded-md'>
            <MagnifyingGlassIcon className="text-black size-6" />
          </InputIcon>
        </div>
      </div>
    </header >
  );
};

export default Header;
