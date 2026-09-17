"use client";

import { Typewriter } from "react-simple-typewriter";

const xpYears = new Date().getFullYear() - 2010;
const words = [
    `coding for ${xpYears} yrs`,
    "working remotely",
    "solving problems",
    "ramping up other devs",
    "helping CEOs",
    "architecting solutions",
    "building AI agents",
    "automating workflows with AI",
    "integrating LLMs into products",
    "building identity systems",
    "loving ❤️ startups",
    "building SaaS 🚀",
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
