import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

// Components
import Logo from '../Logo/Logo';
import Search from '../Search/Search';

const selectedPathStyle = 'border-gray-200';

const Header = () => {
  let { pathname } = useLocation()

  const getLinkClass = (path) =>
    clsx('border-b-2', pathname === path ? selectedPathStyle : 'border-white');

  return (
    <header data-testid="header-component" className="w-full h-24 flex justify-center items-center border-b-2 border-gray-200">
      <div className='2xl:w-[1536px] 2xl:mx-auto 2xl:my-0 mt-4 flex justify-center items-center w-full'>
        <Logo className='flex-1' />
        <nav className="flex-1">
          <ul className="flex justify-center items-center gap-x-8">
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

        <div className='flex flex-1 justify-end'>
          <Search className='w-[17rem]' />
        </div>
      </div>
    </header >
  );
};

export default Header;
