"use client";

import { Typewriter } from "react-simple-typewriter";
import type { Locale } from "@/lib/i18n";

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

const portugueseWords = [
    `com programação há ${xpYears} anos`,
    "remotamente",
    "na solução de problemas",
    "no desenvolvimento de outros devs",
    "com fundadores de empresas",
    "com arquitetura de soluções",
    "com agentes de IA",
    "com automação de processos usando IA",
    "com integração de LLMs em produtos",
    "com sistemas de identidade",
    "com startups ❤️",
    "com produtos SaaS 🚀",
    "e tocado teclado 🎹",
];

const MyTypewriter = ({ locale = "en" }: { locale?: Locale } = {}) => (
    <Typewriter
        words={locale === "pt" ? portugueseWords : words}
        loop={true}
        cursor
        cursorStyle="_"
        typeSpeed={60}
        deleteSpeed={50}
        delaySpeed={1000}
    />
);

export default MyTypewriter;
