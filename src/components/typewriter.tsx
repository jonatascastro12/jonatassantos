"use client";

import { Typewriter } from "react-simple-typewriter";

const xpYears = new Date().getFullYear() - 2010;
const words = [
    `coding for ${xpYears} yrs`,
    "a generalist",
    "working remotely",
    "solving problems",
    "unblocking other devs",
    "helping CEOs",
    "architecting solutions",
    "loving ❤️ startups",
    "unleashing SaaS 🚀",
    "playing keyboards 🎹",
];

const MyTypewriter = () => (
    <Typewriter
        words={words}
        loop={true}
        cursor
        cursorStyle="_"
        typeSpeed={60}
        deleteSpeed={50}
        delaySpeed={1000}
    />
);

export default MyTypewriter;
