import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';

import './Header.scss';

// Icons
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon, HeartIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  XCircleIcon,
  StarIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline';

// Components
import Logo from '../Logo/Logo';
import InputIcon from '../InputIcon/InputIcon';

const selectedPathStyle = 'border-gray-300';

const Header = () => {
  let { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const getLinkClass = (path) =>
    clsx('border-b-2 hover:border-gray-200', pathname === path ? selectedPathStyle : 'border-white');

  return (
    <header data-testid="header-component" className="flex items-center justify-center w-full h-24 px-6 border-b-2 border-gray-200 sm:px-16 3xl:px-0 ">
      <div className='grid sm:grid-cols-[10em_1fr_8em] lg:grid-cols-[15%_1fr_20em_8em] grid-cols-2 grid-rows-2 sm:grid-rows-1 2xl:w-[1536px] 2xl:mx-auto 2xl:my-0 justify-center items-center w-full'>
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={clsx('', isOpen ? "absolute top-0 left-0 w-screen h-screen bg-opacity-20 bg-gray-400" : "text-center relative w-auto h-auto")} onClick={() => { if (isOpen) setIsOpen(false) }} >
          <nav
            className={
              clsx("fixed px-4 h-screen w-80 py-3 text-xl bg-white border-2 border-gray-200 rounded rounded-l-lg top-0 right-0 transform transition-transform duration-100 ease-out",
                isOpen ? "translate-x-0" : "translate-x-full"
              )
            }>
            <ul className="flex flex-col items-center justify-center gap-x-8 gap-y-2">
              {user &&
                <>
                  <li className='w-full text-lg font-semibold sm:text-base'>
                    {user?.email}
                  </li>
                  <hr className='w-full border-gray-200 border-b-1' />
                  <li className='menu-link'>
                    <Link to="/account">
                      <UserIcon />
                      <span>Manage Account</span>
                    </Link>
                  </li>
                  <li className='menu-link'>
                    <Link to="/orders">
                      <ShoppingBagIcon />
                      <span>My Orders</span>
                    </Link>
                  </li>
                  <li className='menu-link'>
                    <Link to="/cancellations">
                      <XCircleIcon />
                      <span>My Cancellations</span>
                    </Link>
                  </li>
                  <li className='menu-link'>
                    <Link to="/reviews">
                      <StarIcon />
                      <span>My Reviews</span>
                    </Link>
                  </li>
                  <hr className='w-full border-gray-200 border-b-1' />
                  <li className='menu-link'>
                    <Link to="/logout">
                      <ArrowLeftStartOnRectangleIcon />
                      <span>Logout</span>
                    </Link>
                  </li>
                </>
              }

              {!user &&
                <>
                  <li className='w-full text-base font-semibold'>
                    <Logo className='flex justify-center' />
                  </li>
                  <hr className='w-full border-gray-200 border-b-1' />
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
                    <Link to="/login">Login</Link>
                  </li>
                </>
              }
            </ul>
          </nav>
        </div>
        {!user &&
          <div className='relative w-auto h-auto col-start-2 row-start-1 text-center' >
            <nav
              className='hidden lg:py-auto lg:text-base lg:block w-52 lg:w-auto lg:border-none'>
              <ul className="flex flex-row items-center justify-center gap-x-8 gap-y-2">
                <>
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
                    <Link to="/login">Login</Link>
                  </li>
                </>
              </ul>
            </nav>
          </div>
        }
        <div className='flex justify-end w-full col-span-2 row-start-2 sm:w-auto sm:col-span-1 sm:row-start-1 sm:col-start-2 lg:col-start-3'>
          <InputIcon className='w-full md:w-[17rem]' placeholder="What are you looking for?" inputStyle='w-full p-2 px-4 text-sm font-normal placeholder-gray-400 bg-gray-100 rounded-md'>
            <MagnifyingGlassIcon className="text-black size-6" />
          </InputIcon>
        </div>
        <div className='flex justify-end col-start-2 row-start-1 gap-2 sm:col-start-3 lg:col-start-4'>
          {user &&
            <>
              <button>
                <ShoppingCartIcon className='w-7 h-7 hover:bg-blue-50' />
              </button>
              <button>
                <HeartIcon className='w-7 h-7 hover:bg-blue-50' />
              </button>
              <button onClick={() => setIsOpen(!isOpen)}>
                <UserIcon className='w-7 h-7 hover:bg-blue-50' />
              </button>
            </>
          }
          {!user &&
            <button onClick={() => setIsOpen(!isOpen)} className='block lg:hidden'>
              <Bars3Icon className='w-7 h-7 hover:bg-blue-50' />
            </button>
          }
        </div>
      </div>
    </header >
  );
};

export default Header;
