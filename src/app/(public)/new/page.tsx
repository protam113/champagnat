"use client";



import RecentPosts from "@/app/components/main/new/RecentPosts";
import FeaturedPosts from "@/app/components/main/new/FeaturedPosts";

const New = () => {
    return (
        <main className="flex flex-col items-center justify-center">
            <FeaturedPosts />
            <RecentPosts />
        </main>
    );
};

export default New;