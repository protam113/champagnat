//api/api.ts

const baseURL = 'http://localhost:8000';

const endpoints = {

    //auth
    login: '/auth/login/',
    register: '/user/register/',

    //web
    web: '/website/1/',

    //current user lgin
    currentUser: '/user/detail/',
    updateProfile: '/user/update-profile/',

    //category(thể loại)
    categories:  '/category/',
    category: '/category/:id/',

   //blog
    blogs: '/blog/',
    blog: '/blog/:id/',
    likeBlog: '/blog/:id/like/',
    commentBlog: '/blog/:id/comment/',
    replyComment: '/comment/:id/replies/',
    comment: '/comment/:id/',

    //group
    groups: '/group/',
    group: '/group/:id/',
    groupMember: '/group/:id/member/',

    //Doc
    documents: '/document/',
    document: '/document/:id/',

     //News
    news: '/news/',
    new: '/news/:id/',

};

export { baseURL, endpoints };
