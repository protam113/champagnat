//api/api.ts

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const endpoints = {

    //auth
    login: process.env.NEXT_PUBLIC_LOGIN,
    register: process.env.NEXT_PUBLIC_REGISTER,
    refresh: process.env.NEXT_PUBLIC_REFRESH,
    changePassword: process.env.NEXT_PUBLIC_CHANGE_PASSWORD,
    codePassword: process.env.NEXT_PUBLIC_RESET_PASSWORD,
    verifyCode: process.env.NEXT_PUBLIC_VERIFY_CODE,

    //current user lgin
    currentUser: process.env.NEXT_PUBLIC_CURRENT_USER,
    updateProfile: process.env.NEXT_PUBLIC_UPDATE_PROFILE,

     // nha dong
     nhaDong: process.env.NEXT_PUBLIC_NHA_DONG,

    //category(thể loại)
    categories: process.env.NEXT_PUBLIC_CATEGORIES,
    category: process.env.NEXT_PUBLIC_CATEGORY,

    // comment
    comment: process.env.NEXT_PUBLIC_COMMENT,

    //blog
    blogs: process.env.NEXT_PUBLIC_BLOGS,
    blog: process.env.NEXT_PUBLIC_BLOG,

    //group
    groups: process.env.NEXT_PUBLIC_BASE_URL,
    group: process.env.NEXT_PUBLIC_BASE_URL,
    groupMember: process.env.NEXT_PUBLIC_BASE_URL,
    groupRole: process.env.NEXT_PUBLIC_BASE_URL,

    //Doc
    documents: process.env.NEXT_PUBLIC_DOCUMENTS,
    document: process.env.NEXT_PUBLIC_DOCUMENT,

    //News
    news:  process.env.NEXT_PUBLIC_NEWS,
    new:  process.env.NEXT_PUBLIC_NEW,

    //event

    events: process.env.NEXT_PUBLIC_EVENTS,
    event: process.env.NEXT_PUBLIC_EVENT,
    eventForm: process.env.NEXT_PUBLIC_EVENT_FORM,
    eventRegister: process.env.NEXT_PUBLIC_EVENT_REGISTER,

    //mission

    missions: process.env.NEXT_PUBLIC_MISSIONS,
    mission:process.env.NEXT_PUBLIC_MISSION,

    // donation
    donations:process.env.NEXT_PUBLIC_DONATIONS,
    donation:process.env.NEXT_PUBLIC_DONATE,
    
    //schedule

    schedules: process.env.NEXT_PUBLIC_SCHEDULES,
};

export { baseURL, endpoints };
