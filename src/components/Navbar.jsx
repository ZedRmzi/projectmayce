import React, { useState } from 'react';
import NavItem from './NavItem';
import { v4 as uuidv4 } from 'uuid';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const navList = [
  { text: "Art", url: "/projectmayce" },
  { text: "About", url: "/about" },
  { text: "More", url: "/more" }
];

const Navbar = () => {
  const [width, setWidth] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();

  function SetDisplayWidth() {
    setWidth(window.innerWidth);
  }
  setInterval(SetDisplayWidth, 125);

  function NavMenuDisplay() {
    if (width > 1023) {
      return (
        <ul className='flex flex-row lg:ease-in-out lg:transition-all basis-4/12 group-hover:basis-5/12 last:border-r-0'>
          {navList.map((item, i) => (
            <NavItem
              key={uuidv4()}
              text={item.text}
              url={item.url}
              isLast={i === navList.length - 1}
            />
          ))}
        </ul>
      );
    } else {
      return (
        <button onClick={{}}>
          <div className="space-y-1 hover:space-y-2 mr-5">
            <span className="block w-8 h-1 bg-[#3B1524]"></span>
            <span className="block w-8 h-1 bg-[#3B1524]"></span>
            <span className="block w-8 h-1 bg-[#3B1524]"></span>
          </div>
        </button>
      );
    }
  }

  return (
    <>
      <nav className='group text-[#3B1524] lg:hover:py-2 grid grid-cols-12 justify-around shadow-md ease-in-out transition-all duration-500'>
        <div className='my-auto py-auto lg:col-span-3 xs:col-span-6 xs:col-start-4 text-center'>
          <h1 className='font-bold font-PassionsConflict lg:text-[3rem] mx-auto'>
            Project <span>Mayce</span>{' '}
            <span className='font-Noto text-sm'>*Under construction</span>
          </h1>
        </div>
        <div className='lg:col-span-9 xs:col-span-1 lg:col-start-5 xs:col-start-12 my-auto flex flex-row-reverse items-center'>
          {NavMenuDisplay()}
          <div className='basis-1/6' />
          <button
            onClick={user ? () => signOut(auth) : () => setShowLogin(true)}
            title={user ? 'Sign out' : 'Admin login'}
            className='text-lg text-[#3B1524] opacity-30 hover:opacity-90 transition-opacity px-2 ml-2'
          >
            {user ? '🔓' : '🔒'}
          </button>
        </div>
      </nav>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;
