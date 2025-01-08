export const NavItems = () => {
  return [
    {
      id: 1,
      label: 'Giới Thiệu',
      children: [
        {
          id: 3,
          label: 'Đặc Sủng - Linh Đạo',
          link: '/hoi_dong/congregation',
        },
        {
          id: 2,
          label: 'Lược sử Hội Dòng',
          link: '/hoi_dong/about_us',
        },
      ],
    },
    {
      key: 4,
      label: 'Ơn gọi',
      children: [
        {
          id: 5,
          label: 'Tìm Hiểu Ơn Gọi',
          link: '/on_goi/tiem_hieu_on_goi',
        },
        {
          id: 6,
          label: 'Các Giai Đoạn Đào Tạo',
          link: '/on_goi/cac_giai_doan_dao_tao',
        },
      ],
    },
    {
      key: 7,
      label: 'Đấng Sáng Lập Dòng',
      children: [
        {
          id: 8,
          label: 'Cuộc đời Đấng Sáng Lập',
          link: '/founder/the_founder_life',
        },
        {
          id: 9,
          label: 'Thư của Đấng Sáng Lập',
          link: '/founder/letter_from_the_founder',
        },
      ],
    },
  ];
};
