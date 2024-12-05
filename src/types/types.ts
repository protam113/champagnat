export interface TextParallaxContentProps {
    imgUrl: string;
    subheading: string;
    heading: string;
    children: React.ReactNode;
  }

  export  interface StickyImageProps {
    imgUrl: string;
  }

  export interface OverlayCopyProps {
    subheading: string;
    heading: string;
  }
  

  /*
    Posts List Interface
  */

    interface Category {
        id: number;
        name: string;
        file: string;
    }
    
    interface User {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string | null;
        profile_image: string;
    }
    
    interface PostList {
        id: number;
        title: string;
        description: string;
        content: string; // Có thể cần điều chỉnh nếu cấu trúc khác
        link: string;
        image: string; // Chỉnh sửa để phù hợp với giá trị null trong JSON
        categories: Category[];
        user: User; // Sử dụng interface User đã khai báo ở trên
        created_date:string
    }
    
    export interface FetchPostListResponse {
        count: number;
        next: string | null;
        previous: string | null;
        results: PostList[];
    }


    interface CategoryList {
        id: string;
        name: string;
        model: string;
        file: string;
    }
    
    // Khai Báo Các Thuộc Tính Không Có trong trường hiển thị
    export interface FetchCategoriesListResponse {
        count: number;
        next: string | null;
        previous: string | null;
        results: CategoryList[];
    }


     /*
    Filters Interface
  */

    export interface Filters {
        [key: string]: string | number | string[] | undefined;
    }


    /**
 PushButtonProps Interface
 **/
export interface PushButtonProps {
    href: string; // Đường dẫn để chuyển hướng
    label: string
}


export interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
  }

  export   interface OptionProps {
    Icon: React.ComponentType;
    title: string;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    open: boolean;
    notifs?: number;
  }

  export  interface TitleSectionProps {
    open: boolean;
  }

  export  interface ToggleCloseProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
  

  export interface CategoryProps {
    category: string;
    handleTagChange: (tag: string) => void;
    refreshKey: number;
    onResetFilter: () => void;
}