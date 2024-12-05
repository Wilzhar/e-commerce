import React from 'react';
import { Link } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

// Components
import InputIcon from '../InputIcon/InputIcon';

const Footer = () => {
  return (
    <footer data-testid="footer-component" className="h-[28rem] bg-black text-white p-24 gap-x-5">
      <div className='flex 2xl:w-[1536px] 2xl:mx-auto 2xl:my-0'>
        <div className="flex flex-col flex-1 w-full h-full gap-3">
          <h3 className='text-xl font-bold'>Exclusive</h3>
          <h3 className='font-bold'>Subscribe</h3>
          <p> Get 10% off on your first order</p>
          <InputIcon className='w-[12em] max-w-[12em]' inputStyle='w-full rounded-md p-2 text-white placeholder-gray-500 bg-black outline-none border-2 border-[1px]' placeholder="Enter your email">
            <PaperAirplaneIcon className="text-white size-6" />
          </InputIcon>
        </div>
        <div className="flex flex-col flex-1 w-full h-full gap-3">
          <h3 className='font-medium text-l'>Support</h3>
          <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div className="flex flex-col flex-1 w-full h-full gap-3">
          <h3 className='font-medium text-l'>Account</h3>
          <Link to='/dashboard'>My Account</Link>
          <Link to='/login'>Login / Register</Link>
          <Link to='/cart'>Cart</Link>
          <Link to='/wishlist'>Wishlist</Link>
          <Link to='/shop'>Shop</Link>
        </div>
        <div className="flex flex-col flex-1 w-full h-full gap-3">
          <h3 className='font-medium text-l'>Quick Links</h3>
          <Link to='/privacy-policy'>Privacy Policy</Link>
          <Link to='/terms-and-conditions'>Terms & Conditions</Link>
          <Link to='/faq'>FAQ</Link>
          <Link to='/contact'>Contact</Link>
        </div>
        <div className="flex flex-col flex-1 w-full h-full gap-3">
          <h3 className='font-medium text-l'>Download App</h3>
          <p>Save $3 with App New User Only</p>
          <div className='flex mx-auto my-0'>
            <img src='/images/download-app-qr.svg' alt='download app' className='m-2 bg-white w-28 h-28' />
            <div className='flex flex-col w-full gap-3 m-auto'>
              <button className='h-auto w-44'>
                <img src='/images/download-app-store.png' alt='app store' className='w-36' />
              </button>
              <button>
                <img src='/images/download-play-store.webp' alt='google play' className='w-36' />
              </button>
            </div>
          </div>
          <div className='flex w-full gap-x-3'>
            <img src='/images/facebook.svg' alt='Facebook' className='flex-1 w-8 h-8 invert brightness-200' />
            <img src='/images/twitter.svg' alt='Twitter' className='flex-1 w-8 h-8 invert brightness-200' />
            <img src='/images/instagram.svg' alt='Instagram' className='flex-1 w-8 h-8 invert brightness-200' />
            <img src='/images/linkedin.svg' alt='Linkedin' className='flex-1 w-8 h-8 invert brightness-200' />
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
