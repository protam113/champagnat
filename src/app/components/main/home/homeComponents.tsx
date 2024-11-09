"use client"; // Ensures this is a client component


import { Invitation } from "./components/Invitation";
import "react-calendar/dist/Calendar.css"; // Import CSS của react-calendar
import { Prayer } from "./components/Prayer";
import { Congregation } from "./components/Congregation";
import {News} from "@/app/components/main/home/components/New";
import {Activity} from "@/app/components/main/home/components/activity";

export const Content = () => {
    return (
        <div>
            <News />
            <br />
            <Prayer />
            <br />
            <Congregation />
            <br />
            <Invitation />
            <br />
            <Activity />
        </div>
    );
};