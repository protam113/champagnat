//api/api.ts

const baseURL = 'http://localhost:8000';

const endpoints = {

    //auth
    login: '/auth/login/',
    register: '/user/register/',
    //current user lgin
    currentUser: '/user/detail/',

    //category(thể loại)
    categories:  '/category/',
    category: '/category/:id/',

    //blog
    blogs: '/blog/',
};

export { baseURL, endpoints };
