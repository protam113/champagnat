export const NavItems = () => {
  return [
    {
      key: 1,
      label: 'Trang Chủ',
      link: '/',
    },
    {
      key: 2,
      label: 'Tin Tức',
      link: '/news',
    },
    {
      key: 3,
      label: 'Bài Viết',
      link: '/blog',
    },
    {
      id: 4,
      label: 'Hội Dòng',
      // link: '/hoi_dong',
      children: [
        {
          id: 5,
          label: 'Giới Thiệu Chung',
          link: '/hoi_dong/about_us',
        },
        {
          id: 6,
          label: 'Ơn Gọi',
          link: '/hoi_dong/on_goi',
        },
        {
          id: 7,
          label: 'Sứ Vụ',
          link: '/hoi_dong/su_vu',
        },
      ],
    },
    {
      id: 8,
      label: 'Sự Kiện',
      children: [
        {
          id: 11,
          label: 'Ơn Gọi',
          link: '/on_goi',
        },
        {
          id: 10,
          label: 'Sự Kiện',
          link: '/events',
        },
      ],
    },
    {
      id: 9,
      label: 'Quyên Góp',
      link: '/donation',
    },
  ];
};
