/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // Nếu bạn sử dụng TailwindCSS
    autoprefixer: {}, // Tùy chọn thêm để xử lý tiền tố trình duyệt
    cssnano: { preset: 'default' }, // Thêm cssnano để nén CSS
  },
};

export default config;
