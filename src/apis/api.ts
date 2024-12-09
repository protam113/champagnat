//api/api.ts

const baseURL = 'http://103.20.102.30:8000/';

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

    // comment
    comment: '/comment/',

   //blog
    blogs: '/blog/',
    blog: '/blog/:id/',

    //group
    groups: '/group/',
    group: '/group/:id/',
    groupMember: '/group/:id/member/',
    groupRole: '/group/:id/role/',
    
    //Doc
    documents: '/document/',
    document: '/document/:id/',

     //News
    news: '/news/',
    new: '/news/:id/',

    //event

    events: '/event/',
    event: '/event/:id/',
    eventForm: '/event/:id/form/',
    eventRegister: '/event/:id/register/',


    nhaDong: '/website/',

    //mission

    missions: '/mission/',
    mission: '/mission/:id/',

    changePassword: '/password/change-password/'


};

export { baseURL, endpoints };
