import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Components
import Logo from '../Logo/Logo';
import InputIcon from '../InputIcon/InputIcon';

const selectedPathStyle = 'border-gray-300';

const Header = () => {
  let { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = (path) =>
    clsx('border-b-2 hover:border-gray-200', pathname === path ? selectedPathStyle : 'border-white');

  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <header data-testid="header-component" className="flex items-center justify-center w-full h-24 px-6 border-b-2 border-gray-200 sm:px-16 3xl:px-0">
      <div className='2xl:w-[1536px] 2xl:mx-auto 2xl:my-0 flex justify-center items-center w-full'>
        <div className='md:flex-[0_0_20%] lg:flex-1 flex-1'>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={clsx('', isOpen ? "absolute top-0 left-0 w-screen h-screen" : "relative w-auto h-auto")} onClick={closeMenu}>
          <nav className={clsx("fixed py-3 text-xl bg-white border-2 border-gray-200 rounded lg:py-auto top-2 right-2 lg:relative lg:text-base lg:flex-1 lg:block w-52 lg:w-auto lg:border-none", isOpen ? "block" : "hidden")}>
            <ul className="flex flex-col items-center justify-center lg:flex-row gap-x-8 gap-y-2">
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
        </div>

        <div className='justify-end hidden lg:flex-1 md:flex md:flex-[0_0_70%]'>
          <InputIcon className='w-[17rem]' placeholder="What are you looking for?" inputStyle='w-full p-2 px-4 text-sm font-normal placeholder-gray-400 bg-gray-100 rounded-md'>
            <MagnifyingGlassIcon className="text-black size-6" />
          </InputIcon>
        </div>
        <div className='flex-1 flex md:flex-[0_0_10%] justify-end lg:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Bars3Icon className='w-7 h-7 hover:bg-blue-50' />
          </button>
        </div>
      </div>
    </header >
  );
};

export default Header;
