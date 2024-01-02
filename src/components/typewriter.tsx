"use client";

import { Typewriter } from 'react-simple-typewriter';



const MyTypewriter = () => <Typewriter
    words={['More than 14 years writing software', 'Generalist', 'Problem Solver', 'Architecting solutions', '❤️ startups!']}
    loop={true}
    cursor
    cursorStyle='_'
    typeSpeed={70}
    deleteSpeed={50}
    delaySpeed={1000}
/>

export default MyTypewriter;