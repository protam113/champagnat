'use client';

import Image from 'next/image';
import { useState } from 'react';
import logo from '@/assets/image/logo.svg';
import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { NavItems } from '@/utils/config';
import { useUser } from '@/context/userContext';
import { useAuth } from '@/context/authContext';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ProfileDrawer from '@/components/drawer/ProfileDrawer';
import { CategoriesList } from '@/lib/categoriesList';

import {
  PiFacebookLogoBold,
  PiHandsPrayingDuotone,
  IoIosArrowDown,
  FiMenu,
  AiOutlineClose,
  AiOutlineYoutube,
  MdOutlineMail,
  FaPhoneVolume,
  BiLogoFacebook,
  RiInstagramLine,
} from '@/lib/iconLib';
type NavItem = {
  label: string | undefined; // Allow undefined
  link?: string;
  children?: NavItem[];
  iconImage?: string;
};

interface CategoryItem {
  id: string;
  name: string;
  image: string;
}

interface SocialIconProps {
  href: string;
  IconComponent: React.ComponentType<{ size: number; color: string }>;
  title: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({
  href,
  IconComponent,
  title,
}) => (
  <div className="tooltip" title={title}>
    <div className="bg-secondary-500 p-1 rounded-full hover:bg-primary-500">
      <a target="_blank" rel="noopener noreferrer" href={href}>
        <IconComponent size={24} color="white" />
      </a>
    </div>
  </div>
);
export const TopHeader = () => {
  return (
    <div className="w-full px-5 mx-auto flex items-center justify-between py-4 text-black lg:text-14 text-12 bg-white">
      <div className="flex items-center gap-1">
        <MdOutlineMail className="h-5 w-5" /> maristvietnam@gmail.com
        <FaPhoneVolume className="ml-5" />
        0384543634 - 0345817993
      </div>
      <div className=" items-center gap-2 cursor-pointer hidden lg:flex">
        <SocialIcon
          href="https://www.facebook.com/groups/345937739645973"
          IconComponent={PiFacebookLogoBold}
          title="Facebook - Marist Vietnam"
        />
        <SocialIcon
          href="https://www.facebook.com/fms.champagnat"
          IconComponent={BiLogoFacebook}
          title="Facebook - Marist World"
        />
        <SocialIcon
          href="https://www.youtube.com/champagnatorg"
          IconComponent={AiOutlineYoutube}
          title="YouTube"
        />
        <SocialIcon
          href="https://www.instagram.com/fms.champagnat/"
          IconComponent={RiInstagramLine}
          title="Instagram"
        />
        <SocialIcon
          href="https://champagnat.org/en/library/prayers/"
          IconComponent={PiHandsPrayingDuotone}
          title="Prayers"
        />
      </div>
    </div>
  );
};
export const Dropdown_image = ({ userInfo }: { userInfo: any }) => {
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
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary-50 transition-all duration-300 group-hover:w-full" />
            </span>
            <IoIosArrowDown className="rotate-180 w-3 transition-all group-hover:rotate-0 group-hover:text-primary-50" />
          </p>
          {/* dropdown */}
          <div className="absolute z-50 top-full left-0 hidden flex-col gap-1 bg-primary-500 py-3 transition-all group-hover:flex">
            <div className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-primary-50">
              <span className="whitespace-nowrap pl-3" onClick={showDrawer}>
                Thông Tin Cá Nhân
              </span>
            </div>
            <div className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-primary-50">
              <Link href="/study" className="whitespace-nowrap pl-3">
                Học Tập
              </Link>
            </div>
            <div
              className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-primary-50"
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
/*
Dropdown Item
*/
export const Dropdown_Item = ({ modal }: { modal: any }) => {
  const [currentPage] = useState(1);

  const { queueData, isLoading, isError } = CategoriesList(
    currentPage,
    modal,
    0,
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return null;

  return (
    <>
      {queueData?.map((category: CategoryItem) => (
        <Link
          key={category.id} // Thêm key duy nhất
          href={`/${modal}/category/${category.id}`}
          className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-primary-50"
        >
          {/* Danh mục sẽ chỉ hiển thị trong một dòng và dài ra khi cần */}
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {category.name}
          </span>
        </Link>
      ))}
    </>
  );
};
export const BacAiDropdown_Item = () => {
  return (
    <>
      <Link
        href="/projects"
        className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-albert-warning"
      >
        {/* Danh mục sẽ chỉ hiển thị trong một dòng và dài ra khi cần */}
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          Dự Án
        </span>
      </Link>
      <Link
        href="/donation"
        className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-albert-warning"
      >
        {/* Danh mục sẽ chỉ hiển thị trong một dòng và dài ra khi cần */}
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          Quyên Góp
        </span>
      </Link>
    </>
  );
};
/*
Multimedia Dropdown Item
*/
export const MultimediaDropdown_Item = () => {
  return (
    <>
      <Link
        href="/thu_vien/thu_vien_anh"
        className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-primary-50"
      >
        {/* Danh mục sẽ chỉ hiển thị trong một dòng và dài ra khi cần */}
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          Ảnh
        </span>
      </Link>
      <Link
        href="/thu_vien/thu_vien_video"
        className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-primary-50"
      >
        {/* Danh mục sẽ chỉ hiển thị trong một dòng và dài ra khi cần */}
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          Video
        </span>
      </Link>
      <Link
        href="https://www.flickr.com/photos/fms_champagnat/collections?fbclid=IwY2xjawH2k6pleHRuA2FlbQIxMAABHUBVmKmWgdT2ThL06grdrqdcXrGE09hhmtlNwYf-LMN-kJ2R5ldeuIy4BA_aem_79VkDt8YUcOYRURmIO3OMQ"
        target="_blank"
        rel="noopener noreferrer"
        className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-primary-50"
      >
        {/* Danh mục sẽ chỉ hiển thị trong một dòng và dài ra khi cần */}
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          Thư Viện Ảnh
        </span>
      </Link>
    </>
  );
};

export default function Navbar() {
  const { userInfo } = useUser() || {}; // Provide a default empty object if useUser returns null
  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenue] = useState(false);
  const navItems = NavItems();

  function openSideMenu() {
    setSideMenue(true);
  }

  function closeSideMenu() {
    setSideMenue(false);
  }

  return (
    <div className="sticky top-0 mx-auto flex w-full justify-between px-8 py-3 text-14 bg-primary-500 z-50">
      {/* left side  */}
      <section
        ref={animationParent}
        className="flex items-center justify-between w-full"
      >
        {/* logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            height={80}
            width={120}
            className="transition-transform duration-300 ease-in-out hover:scale-90"
          />
        </Link>

        <MobileNav
          closeSideMenu={closeSideMenu}
          isSideMenuOpen={isSideMenuOpen}
        />

        {/* Nav items */}
        <div className="hidden md:flex items-center justify-center flex-grow gap-8 transition-all">
          {navItems.map((d, i) => (
            <div key={i} className="relative group py-3 text-14 transition-all">
              <p className="flex cursor-pointer font-semibold items-center gap-2 text-white">
                <span className="relative">
                  {d.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-albert-warning transition-all duration-300 group-hover:w-full" />
                </span>
                {d.children && (
                  <IoIosArrowDown className="rotate-180 font-bold w-3 transition-all group-hover:rotate-0 group-hover:text-primary-50" />
                )}
              </p>
              {/* dropdown */}
              {d.children && (
                <div className="absolute z-50 top-full left-0 hidden flex-col gap-1 bg-primary-500 py-3 transition-all group-hover:flex">
                  {d.children.map((ch, i) => (
                    <Link
                      key={i}
                      href={ch.link ?? '#'}
                      className="flex cursor-pointer items-center py-1 pr-8 text-white hover:text-primary-50"
                    >
                      <span className="whitespace-nowrap pl-3">{ch.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/news"
            className="relative group py-2 text-14 transition-all"
          >
            <p className="flex cursor-pointer font-semibold items-center gap-2 text-white">
              <span className="relative">
                Tin Tức
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary-50 transition-all duration-300 group-hover:w-full" />
              </span>
              <IoIosArrowDown className="rotate-180 w-3 transition-all group-hover:rotate-0 group-hover:text-primary-50" />
              <div className="absolute z-50 top-full left-0 hidden flex-col gap-1 bg-primary-500 py-3 px-4 transition-all group-hover:flex">
                <Dropdown_Item modal="news" />
              </div>
            </p>
          </Link>

          <Link
            href="/mission"
            className="relative group py-2 text-14 transition-all"
          >
            <p className="flex cursor-pointer font-semibold items-center gap-2 text-white">
              <span className="relative">
                Sứ Vụ
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary-50 transition-all duration-300 group-hover:w-full" />
              </span>
              <IoIosArrowDown className="rotate-180 w-3 transition-all group-hover:rotate-0 group-hover:text-primary-50" />
              <div className="absolute z-50 top-full left-0 hidden flex-col gap-1 bg-primary-500 py-3 px-4 transition-all group-hover:flex">
                <Dropdown_Item modal="mission" />
              </div>
            </p>
          </Link>

          <Link
            href="/blog"
            className="relative group py-3 text-14 transition-all"
          >
            <p className="flex cursor-pointer font-semibold items-center gap-2 text-white">
              <span className="relative">
                Giáo Hội
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary-50 transition-all duration-300 group-hover:w-full" />
              </span>
              <IoIosArrowDown className="rotate-180 w-3 transition-all group-hover:rotate-0 group-hover:text-primary-50" />
              <div className="absolute z-50 top-full left-0 hidden flex-col gap-1 bg-primary-500 py-3 px-4 transition-all group-hover:flex">
                <Dropdown_Item modal="blog" />
              </div>
            </p>
          </Link>
          <div className="relative group py-3 text-14 transition-all">
            <p className="flex cursor-pointer font-semibold items-center gap-2 text-white">
              <span className="relative">
                Bác Ái Xã Hội
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-albert-warning transition-all duration-300 group-hover:w-full" />
              </span>
              <IoIosArrowDown className="rotate-180 w-3 transition-all group-hover:rotate-0 group-hover:text-albert-warning" />
              <div className="absolute z-50 top-full left-0 hidden flex-col gap-1 bg-primary-500 py-3 px-4 transition-all group-hover:flex">
                <BacAiDropdown_Item />
              </div>
            </p>
          </div>
          <Link
            href="/document"
            className="relative group py-3 text-14 transition-all"
          >
            <p className="flex cursor-pointer font-semibold items-center gap-2 text-white">
              <span className="relative">
                Tư Liệu
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary-50 transition-all duration-300 group-hover:w-full" />
              </span>
              <IoIosArrowDown className="rotate-180 w-3 transition-all group-hover:rotate-0 group-hover:text-primary-50" />

              <div className="absolute z-50 top-full left-0 hidden flex-col gap-1 bg-primary-500 py-3 px-4 transition-all group-hover:flex">
                <Dropdown_Item modal="document" />
              </div>
            </p>
          </Link>
          <div className="relative group py-3 text-14 transition-all">
            <p className="flex  cursor-pointe  font-semibold items-center gap-2 text-white">
              <span className="relative">
                Media
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary-50 transition-all duration-300 group-hover:w-full" />
              </span>
              <IoIosArrowDown className="rotate-180 w-3 transition-all group-hover:rotate-0 group-hover:text-primary-50" />
              <div className="absolute z-50 top-full left-0 hidden flex-col gap-1 bg-primary-500 py-3 px-4 transition-all group-hover:flex">
                <MultimediaDropdown_Item />
              </div>
            </p>
          </div>
        </div>

        {/* right side data */}
        <section className="hidden md:flex items-center gap-8">
          {userInfo ? (
            <Dropdown_image userInfo={userInfo} /> // Show dropdown if user is logged in
          ) : (
            <Link href="/login">
              <button className="h-fit rounded-xl bg-secondary-500 px-4 py-2 text-white font-bold transition-colors duration-300 ease-in-out hover:bg-primary-50">
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

// mobile}
function SingleNavItem(d: NavItem & { closeSideMenu: any }) {
  const [animationParent] = useAutoAnimate();
  const [isItemOpen, setItem] = useState(false);

  function toggleItem(e: React.MouseEvent) {
    e.stopPropagation(); // Ngừng sự kiện lan truyền để không tắt sidebar
    setItem(!isItemOpen);
  }

  return (
    <Link
      ref={animationParent}
      onClick={(e) => {
        toggleItem(e);
        // Khi click vào item, đóng sidebar nếu có closeSideMenu
        if (d.link && d.closeSideMenu) {
          d.closeSideMenu();
        }
      }}
      href={d.link ?? '#'}
      className="relative px-2 py-3 transition-all"
    >
      <p className="flex cursor-pointer items-center gap-2 text-white hover:text-yellow-500">
        <span>{d.label}</span> {/* Use a default string */}
        {d.children && (
          <IoIosArrowDown
            className={`text-xs transition-all ${isItemOpen && 'rotate-180'}`}
          />
        )}
      </p>
      {isItemOpen && d.children && (
        <p className="w-auto flex-col gap-1 rounded-md text-primary-500 bg-white py-3 transition-all flex">
          {d.children.map((ch, i) => (
            <Link
              key={i}
              href={ch.link ?? '#'}
              className="flex cursor-pointer items-center py-1 pr-8 text-black hover:text-black"
              onClick={() => {
                // Đóng sidebar khi click vào item con
                if (d.closeSideMenu) d.closeSideMenu();
              }}
            >
              <span className="whitespace-nowrap pl-3">{ch.label}</span>
            </Link>
          ))}
        </p>
      )}
    </Link>
  );
}

function MobileNavItem({
  model,
  closeSideMenu,
}: {
  model: any;
  closeSideMenu: any;
}) {
  const [currentPage] = useState(1);

  const { queueData, isLoading, isError } = CategoriesList(
    currentPage,
    model,
    0,
  );

  // Kiểm tra trạng thái đang tải dữ liệu
  if (isLoading) return <div>Loading...</div>;

  // Kiểm tra trạng thái lỗi khi tải dữ liệu
  if (isError) return <div>Error loading categories</div>;

  return (
    <p className="w-auto flex-col gap-1 rounded-md text-primary-500 bg-white py-3 transition-all flex">
      {queueData?.map((category: CategoryItem) => (
        <Link
          key={category.id} // Thêm key duy nhất
          href={`/${model}/category/${category.id}`}
          className="flex cursor-pointer items-center py-1  pr-6 text-black hover:text-black"
          onClick={closeSideMenu}
        >
          <span className="whitespace-nowrap pl-3">{category.name}</span>
        </Link>
      ))}
    </p>
  );
}

function BacAiNavItem({ closeSideMenu }: { closeSideMenu: any }) {
  return (
    <div className="flex flex-col gap-2 py-3 px-4 bg-white rounded-md shadow-md transition-all">
      <Link
        href="/projects"
        className="flex cursor-pointer items-center py-2 pr-6 text-black hover:text-primary-500 transition-all"
        onClick={closeSideMenu}
      >
        <span className="whitespace-nowrap pl-3">Dự Án</span>
      </Link>
      <Link
        href="/donation"
        className="flex cursor-pointer items-center py-2 pr-6 text-black hover:text-albert-warning transition-all"
        onClick={closeSideMenu}
      >
        <span className="whitespace-nowrap pl-3">Quyên Góp</span>
      </Link>
    </div>
  );
}

function MultimediaNavItem({ closeSideMenu }: { closeSideMenu: any }) {
  return (
    <div className="flex flex-col gap-2 py-3 px-4 bg-white rounded-md shadow-md transition-all">
      <Link
        href="/thu_vien/thu_vien_anh"
        className="flex cursor-pointer items-center py-1 pr-8 text-black hover:text-primary-50"
        onClick={closeSideMenu}
      >
        {/* Danh mục sẽ chỉ hiển thị trong một dòng và dài ra khi cần */}
        <span className="whitespace-nowrap ">Ảnh</span>
      </Link>
      <Link
        href="/thu_vien/thu_vien_video"
        className="flex cursor-pointer items-center py-1 pr-8 text-black hover:text-primary-50"
        onClick={closeSideMenu}
      >
        {/* Danh mục sẽ chỉ hiển thị trong một dòng và dài ra khi cần */}
        <span className="whitespace-nowrap ">Video</span>
      </Link>
      <Link
        href="https://www.flickr.com/photos/fms_champagnat/collections?fbclid=IwY2xjawH2k6pleHRuA2FlbQIxMAABHUBVmKmWgdT2ThL06grdrqdcXrGE09hhmtlNwYf-LMN-kJ2R5ldeuIy4BA_aem_79VkDt8YUcOYRURmIO3OMQ"
        className="flex cursor-pointer items-center py-1 pr-8 text-black hover:text-primary-50"
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeSideMenu}
      >
        {/* Danh mục sẽ chỉ hiển thị trong một dòng và dài ra khi cần */}
        <span className="whitespace-nowrap ">Thư Viện Ảnh</span>
      </Link>
    </div>
  );
}

function MobileNav({
  closeSideMenu,
  isSideMenuOpen,
}: {
  closeSideMenu: () => void;
  isSideMenuOpen: boolean;
}) {
  const [animationParent] = useAutoAnimate();
  const navItems = NavItems();
  const { userInfo } = useUser() || {};
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  // Quản lý trạng thái mở/đóng của các dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id)); // Nếu đang mở thì đóng, nếu không thì mở mục đó
  };

  return (
    <>
      <div
        className={`fixed left-0 top-0 flex h-full min-h-screen w-full md:hidden bg-black/50 transition-all duration-300 ${isSideMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeSideMenu}
      >
        <div
          className={`h-full w-[65%] bg-primary-500 text-white px-4 py-4 transition-transform duration-300 ${isSideMenuOpen ? 'translate-x-0' : 'translate-x-full'} ml-auto`}
        >
          <section className="flex justify-end">
            <AiOutlineClose
              onClick={closeSideMenu}
              className="cursor-pointer text-4xl"
            />
          </section>
          <div className="flex flex-col text-14 text-white gap-2 transition-all">
            {/* Loop through navItems */}
            {navItems.map((d, i) => (
              <SingleNavItem
                key={i}
                label={d.label}
                closeSideMenu={closeSideMenu}
              >
                {d.children}
              </SingleNavItem>
            ))}

            {/* Mục "Tin Tức" với dropdown */}
            <Link
              ref={animationParent}
              href="/news"
              className="relative px-2 py-3 transition-all"
              onClick={(e) => {
                e.stopPropagation();

                toggleDropdown('Tin Tức'); // Toggle trạng thái "Tin Tức"
              }}
            >
              <p className="flex cursor-pointer items-center gap-2 text-white">
                <span>Tin Tức</span>
                <IoIosArrowDown
                  className={`transition-all ${openDropdown === 'Tin Tức' ? 'rotate-180' : ''}`} // Điều chỉnh mũi tên
                />
              </p>

              {/* Hiển thị dropdown khi openDropdown === 'Tin Tức' */}
              {openDropdown === 'Tin Tức' && (
                <div className="w-auto flex-col flex overflow-hidden transition-all">
                  <MobileNavItem model="news" closeSideMenu={closeSideMenu} />
                </div>
              )}
            </Link>

            {/* Mục "Giáo Hội" với dropdown */}
            <Link
              ref={animationParent}
              href="/mission"
              className="relative px-2 py-3 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('Sứ Vụ'); // Toggle trạng thái "Giáo Hội"
              }}
            >
              <p className="flex cursor-pointer items-center gap-2 text-white hover:text-yellow-500">
                <span>Sứ Vụ</span>
                <IoIosArrowDown
                  className={`transition-all ${openDropdown === 'Sứ Vụ' ? 'rotate-180' : ''}`} // Điều chỉnh mũi tên
                />
              </p>

              {/* Hiển thị dropdown khi openDropdown === 'Giáo Hội' */}
              {openDropdown === 'Sứ Vụ' && (
                <div className="w-auto flex-col flex overflow-hidden transition-all">
                  <MobileNavItem
                    model="mission"
                    closeSideMenu={closeSideMenu}
                  />
                </div>
              )}
            </Link>

            {/* Mục "Giáo Hội" với dropdown */}
            <Link
              ref={animationParent}
              href="/blog"
              className="relative px-2 py-3 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('Giáo Hội'); // Toggle trạng thái "Giáo Hội"
              }}
            >
              <p className="flex cursor-pointer items-center gap-2 text-white hover:text-yellow-500">
                <span>Giáo Hội</span>
                <IoIosArrowDown
                  className={`transition-all ${openDropdown === 'Giáo Hội' ? 'rotate-180' : ''}`} // Điều chỉnh mũi tên
                />
              </p>

              {/* Hiển thị dropdown khi openDropdown === 'Giáo Hội' */}
              {openDropdown === 'Giáo Hội' && (
                <div className="w-auto flex-col flex overflow-hidden transition-all">
                  <MobileNavItem model="blog" closeSideMenu={closeSideMenu} />
                </div>
              )}
            </Link>
            {/* Mục "Bác Aí " với dropdown */}
            <div
              ref={animationParent}
              className="relative px-2 py-3 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('Bác Aí'); // Toggle trạng thái "Giáo Hội"
              }}
            >
              <p className="flex cursor-pointer items-center gap-2 text-white hover:text-yellow-500">
                <span>Bác Aí Xã Hội</span>
                <IoIosArrowDown
                  className={`transition-all ${openDropdown === 'Bác Aí' ? 'rotate-180' : ''}`} // Điều chỉnh mũi tên
                />
              </p>

              {/* Hiển thị dropdown khi openDropdown === 'Giáo Hội' */}
              {openDropdown === 'Bác Aí' && (
                <div className="w-auto flex-col flex overflow-hidden transition-all">
                  <BacAiNavItem closeSideMenu={closeSideMenu} />
                </div>
              )}
            </div>

            {/* Mục "Tư Liệu" với dropdown */}
            <Link
              ref={animationParent}
              href="/document"
              className="relative px-2 py-3 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('Tư Liệu'); // Toggle trạng thái "Giáo Hội"
              }}
            >
              <p className="flex cursor-pointer items-center gap-2 text-white hover:text-yellow-500">
                <span>Tư Liệu</span>
                <IoIosArrowDown
                  className={`transition-all ${openDropdown === 'Tư Liệu' ? 'rotate-180' : ''}`} // Điều chỉnh mũi tên
                />
              </p>

              {/* Hiển thị dropdown khi openDropdown === 'Tư Liệu' */}
              {openDropdown === 'Tư Liệu' && (
                <div className="w-auto flex-col flex overflow-hidden transition-all">
                  <MobileNavItem
                    model="document"
                    closeSideMenu={closeSideMenu}
                  />
                </div>
              )}
            </Link>

            {/* Mục "Bác Aí " với dropdown */}
            <div
              ref={animationParent}
              className="relative px-2 py-3 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('Media'); // Toggle trạng thái "Giáo Hội"
              }}
            >
              <p className="flex cursor-pointer items-center gap-2 text-white hover:text-yellow-500">
                <span>Media</span>
                <IoIosArrowDown
                  className={`transition-all ${openDropdown === 'Media' ? 'rotate-180' : ''}`} // Điều chỉnh mũi tên
                />
              </p>

              {/* Hiển thị dropdown khi openDropdown === 'Giáo Hội' */}
              {openDropdown === 'Media' && (
                <div className="w-auto flex-col flex overflow-hidden transition-all">
                  <MultimediaNavItem closeSideMenu={closeSideMenu} />
                </div>
              )}
            </div>
          </div>

          {userInfo ? (
            <section className="flex flex-col gap-6 mt-6 items-center">
              <button
                className="w-full max-w-[200px] rounded-xl border-2 border-neutral-400 px-4 py-2 text-white transition-all hover:border-black hover:text-black/90"
                onClick={() => setOpen(true)}
              >
                Thông tin cá nhân
              </button>

              <button className="w-full max-w-[200px] rounded-xl border-2 border-neutral-400 px-4 py-2 text-white transition-all hover:border-black hover:text-black/90">
                <Link href="/study" className="whitespace-nowrap">
                  Học Tập
                </Link>
              </button>

              <button
                className="w-full max-w-[200px] rounded-xl bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600"
                onClick={() => {
                  logout();
                  closeSideMenu();
                }}
              >
                Đăng xuất
              </button>
            </section>
          ) : (
            <section className="flex flex-col gap-6 mt-6 items-center">
              <Link
                href="/login"
                className="h-fit text-neutral-400 transition-all hover:text-primary-50"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="w-full max-w-[200px] rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-primary-50"
              >
                Đăng ký
              </Link>
            </section>
          )}
        </div>
      </div>
      <ProfileDrawer
        open={open}
        onClose={() => setOpen(false)}
        userInfo={userInfo}
      />
    </>
  );
}
