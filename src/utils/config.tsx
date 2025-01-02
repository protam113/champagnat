export const NavItems = () => {
  return [
    // {
    //   key: 1,
    //   label: 'Trang Chủ',
    //   link: '/',
    // },

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
          link: '/vocation/learn_about_vocation',
        },
        {
          id: 6,
          label: 'Các Giai Đoạn Đào Tạo',
          link: '/vocation/training_stages',
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
          link: '/founder/letter_from_the_foundern',
        },
      ],
    },
    //     {
    //       id: 8,
    //       label: 'Sự Kiện & Ơn Gọi',
    //       children: [
    //         {
    //           id: 11,
    //           label: 'Ơn Gọi',
    //           link: '/on_goi',
    //         },
    //         {
    //           id: 10,
    //           label: 'Sự Kiện',
    //           link: '/events',
    //         },
    //       ],
    //     },
    //     {
    //       id: 12,
    //       label: 'Thư Viện',
    //       children: [
    //         {
    //           id: 6,
    //           label: 'Ảnh',
    //           link: '/thu_vien_anh',
    //         },
    //         {
    //           id: 13,
    //           label: 'Video',
    //           link: '/thu_vien_video',
    //         },
    //       ],
    //     },
    //     {
    //       id: 14,
    //       label: 'Cầu Nguyện',
    //       link: '/donation',
    //     },
    //     {
    //       id: 9,
    //       label: 'Quyên Góp',
    //       link: '/donation',
    //     },
  ];
};
