// Đặt kiểu cho tham số `classNames` để tránh lỗi TS7019
export const cx = (...classNames: (string | undefined | null | false)[]): string => {
    return classNames.filter(Boolean).join(" ");
};

// Định nghĩa kiểu cho `src` trong `myLoader`
export const myLoader = ({ src }: { src: string }): string => {
    return src;
};
