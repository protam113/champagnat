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


    /**
 Group List Interface
 **/

interface GroupList {
  id: number;
  name: string;
  founding_date: string; // Có thể cần điều chỉnh nếu cấu trúc khác
  link: string;
  image: string | null; // Chỉnh sửa để phù hợp với giá trị null trong JSON
  created_date: string;
  updated_date: string;
  // user: Documents; // Sử dụng interface User đã khai báo ở trên
}

// Khai Báo Các Thuộc Tính Không Có trong trường hiển thị
export interface FetchGroupListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GroupList[];
}


    /**
 Group Member List Interface
 **/

interface GroupMember {
  id: number;
  name: string;
  email: string; // Có thể cần điều chỉnh nếu cấu trúc khác
  link: string;
  dob: Date;
  phone_number:string;
  image: string | null; // Chỉnh sửa để phù hợp với giá trị null trong JSON
  role:string;
  join_date: Date;
  first_vows_date: Date;
  final_vows_date: Date;
  group:string
  created_date: Date;
  updated_date: Date;
  // user: Documents; // Sử dụng interface User đã khai báo ở trên
}

// Khai Báo Các Thuộc Tính Không Có trong trường hiển thị
export interface FetchGroupMemberListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GroupMember[];
}

export interface Group {
  groupId: string;
}

    /**
 Group Detail Interface
 **/

export interface GroupDetail {
  open: boolean;
  onClose: () => void;
  group: any | null; // Accept blog data type as any
}

    /**
 Blog Detail Interface
 **/

 export interface BLogDetail {
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