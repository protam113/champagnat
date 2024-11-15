"use client"; // Ensures this is a client component

import Hero from '../components/DefaultLayout/components/Hero'
import {Content} from "@/app/components/main/home/homeComponents";

// src/pages/index.tsx
const Home = () => {
    return (
        <div>
            <Hero />
            <Content />
        </div>
    );
};

export default Home;