'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '@/assets/image/logo.svg';
import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { NavItems } from '@/utils/config';
import { MdOutlineMail } from 'react-icons/md';
import { FaPhoneVolume } from 'react-icons/fa';
import { useUser } from '@/context/userContext';
import { useAuth } from '@/context/authContext';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ProfileDrawer from '@/app/components/drawer/ProfileDrawer';

type NavItem = {
  label: string | undefined; // Allow undefined
  link: string;
  children?: NavItem[];
  iconImage?: string;
};

export const TopHeader = () => {
  return (
    <div className="w-full px-8 mx-auto flex items-center justify-start py-4 text-black text-sm bg-white">
      <div className="flex items-center gap-1">
        <MdOutlineMail className="h-5 w-5" /> xlr.devteam03@devteam03gmail.com
        <FaPhoneVolume className="ml-5" />
        (+84) 377-783437
      </div>
    </div>
  );
};

export const Dropdown_image = () => {
  const { userInfo } = useUser() || {}; // Provide a default empty object if useUser returns null
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="hidden md:flex items-center justify-center flex-grow gap-10 transition-all">
        <div className="relative group px-2 py-3 transition-all">
          <p className="flex cursor-pointer font-bold items-center gap-2 text-white">
            <span className="relative">
              <Avatar
                src={userInfo?.profile_image || undefined} // Use user's profile image if available
                style={{
                  backgroundColor: '#fde3cf',
                  color: '#f56a00',
                  marginRight: 8,
                }}
                icon={!userInfo?.profile_image ? <UserOutlined /> : undefined} // Fallback icon
              />
              {userInfo?.username || 'User'}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
            </span>
            <IoIosArrowDown className="rotate-180 w-3 transition-all group-hover:rotate-0 group-hover:text-yellow-400" />
          </p>
          {/* dropdown */}
          <div className="absolute z-50 top-full left-0 hidden flex-col gap-1 bg-primary-500 py-3 transition-all group-hover:flex">
            <div className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-yellow-300">
              <span className="whitespace-nowrap pl-3" onClick={showDrawer}>
                Thông Tin Cá Nhân
              </span>
            </div>
            <div className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-yellow-300">
              <Link href="/study" className="whitespace-nowrap pl-3">
                Học Tập
              </Link>
            </div>
            <div
              className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-yellow-300"
              onClick={() => {
                logout(); // Call logout function
              }}
            >
              <span className="whitespace-nowrap pl-3">Đăng Xuất</span>
            </div>
          </div>
        </div>
      </div>
      <ProfileDrawer open={open} onClose={onClose} userInfo={userInfo} />
    </>
  );
};

export default function Navbar() {
  const { userInfo } = useUser() || {}; // Provide a default empty object if useUser returns null
  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenue] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navItems = NavItems();
  useEffect(() => {
    setIsMounted(true); // Set to true after component mounts
  }, []);

  function openSideMenu() {
    setSideMenue(true);
  }

  function closeSideMenu() {
    setSideMenue(false);
  }

  if (!isMounted) {
    // Render nothing on the server to prevent hydration issues
    return null;
  }

  return (
    <div className="sticky top-0 mx-auto flex w-full justify-between px-8 py-3 text-14 bg-primary-500 z-10">
      {/* left side  */}
      <section
        ref={animationParent}
        className="flex items-center justify-between w-full"
      >
        {/* logo */}
        <Image src={logo} alt="logo" height={80} width={120} />
        {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}

        {/* Nav items */}
        <div className="hidden md:flex items-center justify-center flex-grow gap-10 transition-all">
          {navItems.map((d, i) => (
            <Link
              key={i}
              href={d.link ?? '#'}
              className="relative group px-2 py-3 transition-all"
            >
              <p className="flex cursor-pointer font-bold items-center gap-2 text-white">
                <span className="relative">
                  {d.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </span>
                {d.children && (
                  <IoIosArrowDown className="rotate-180 w-3 transition-all group-hover:rotate-0 group-hover:text-yellow-400" />
                )}
              </p>
              {/* dropdown */}
              {d.children && (
                <div className="absolute z-50 top-full left-0 hidden flex-col gap-1 bg-primary-500 py-3 transition-all group-hover:flex">
                  {d.children.map((ch, i) => (
                    <Link
                      key={i}
                      href={ch.link ?? '#'}
                      className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-yellow-300"
                    >
                      <span className="whitespace-nowrap pl-3">{ch.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* right side data */}
        <section className="hidden md:flex items-center gap-8">
          {userInfo ? (
            <Dropdown_image /> // Show dropdown if user is logged in
          ) : (
            <Link href="/login">
              <button className="h-fit rounded-xl bg-primary-400 px-4 py-2 text-white font-bold transition-colors duration-300 ease-in-out hover:bg-yellow-500">
                Login
              </button>
            </Link>
          )}
        </section>

        <FiMenu
          onClick={openSideMenu}
          className="cursor-pointer text-4xl md:hidden text-white"
        />
      </section>
    </div>
  );
}

function SingleNavItem(d: NavItem) {
  const [animationParent] = useAutoAnimate();
  const [isItemOpen, setItem] = useState(false);

  function toggleItem() {
    setItem(!isItemOpen);
  }

  return (
    <Link
      ref={animationParent}
      onClick={toggleItem}
      href={d.link ?? '#'}
      className="relative px-2 py-3 transition-all"
    >
      <p className="flex cursor-pointer items-center gap-2 text-black group-hover:text-black">
        <span>{d.label || 'Default Label'}</span> {/* Use a default string */}
        {d.children && (
          <IoIosArrowDown
            className={`text-xs transition-all ${isItemOpen && 'rotate-180'}`}
          />
        )}
      </p>
      {isItemOpen && d.children && (
        <p className="w-auto flex-col gap-1 rounded-lg bg-white py-3 transition-all flex">
          {d.children.map((ch, i) => (
            <Link
              key={i}
              href={ch.link ?? '#'}
              className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-black hover:text-black"
            >
              <span className="whitespace-nowrap pl-3">{ch.label}</span>
            </Link>
          ))}
        </p>
      )}
    </Link>
  );
}

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
  const navItems = NavItems();

  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-pr md:hidden text-black">
      <div className="h-full w-[65%] bg-white px-4 py-4">
        <section className="flex justify-end">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor-pointer text-4xl"
          />
        </section>
        <div className="flex flex-col text-14 text-black gap-2 transition-all">
          {navItems.map((d, i) => (
            <SingleNavItem key={i} label={d.label} link={d.link}>
              {d.children}
            </SingleNavItem>
          ))}
        </div>
        <section className="flex flex-col gap-8 mt-4 items-center">
          <button className="h-fit text-neutral-400 transition-all hover:text-black/90">
            Login
          </button>

          <button className="w-full max-w-[200px] rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
            Register
          </button>
        </section>
      </div>
    </div>
  );
}
