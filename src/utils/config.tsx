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
      children: [
        {
          id: 5,
          label: 'Giới Thiệu Chung',
          link: '/hoi_dong/about_us',
        },
        {
          id: 15,
          label: 'Hội Dòng AEDM VN',
          link: '/hoi_dong/congregation',
        },
        {
          id: 12,
          label: 'Đặc Sủng - Linh Đạo',
          link: '/hoi_dong/charismn',
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
      label: 'Sự Kiện & Ơn Gọi',
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
      id: 12,
      label: 'Thư Viện',
      children: [
        {
          id: 6,
          label: 'Ảnh',
          link: '/thu_vien_anh',
        },
        {
          id: 13,
          label: 'Video',
          link: '/thu_vien_video',
        },
      ],
    },
    {
      id: 14,
      label: 'Cầu Nguyện',
      link: '/donation',
    },
    {
      id: 9,
      label: 'Quyên Góp',
      link: '/donation',
    },
  ];
};
