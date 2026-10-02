import type { Locale } from "./i18n";

type Labels = Record<string, Record<Locale, string>>;

export const categories: Labels = {
    engineering: { en: "Engineering", pt: "Engenharia" },
    music: { en: "Music", pt: "Música" },
    marketing: { en: "Marketing", pt: "Marketing" },
    personal: { en: "Personal", pt: "Pessoal" },
    faith: { en: "Faith", pt: "Fé" },
};

export const tags: Labels = {
    "music-production": { en: "Music production", pt: "Produção musical" },
    gear: { en: "Gear", pt: "Equipamentos" },
    piano: { en: "Piano", pt: "Piano" },
    "ear-training": { en: "Ear training", pt: "Percepção musical" },
    midi: { en: "MIDI", pt: "MIDI" },
    keyboards: { en: "Keyboards", pt: "Teclados" },
    "live-performance": { en: "Live performance", pt: "Performance ao vivo" },
    "virtual-instruments": { en: "Virtual instruments", pt: "Instrumentos virtuais" },
    automation: { en: "Automation", pt: "Automação" },
    "web-apps": { en: "Web apps", pt: "Aplicações web" },
    email: { en: "Email", pt: "E-mail" },
    "affiliate-marketing": { en: "Affiliate marketing", pt: "Marketing de afiliados" },
    "lead-management": { en: "Lead management", pt: "Gestão de leads" },
    branding: { en: "Branding", pt: "Identidade visual" },
    "web-development": { en: "Web development", pt: "Desenvolvimento web" },
    reflections: { en: "Reflections", pt: "Reflexões" },
    devotionals: { en: "Devotionals", pt: "Devocionais" },
    podcast: { en: "Podcast", pt: "Podcast" },
    identity: { en: "Identity", pt: "Identidade" },
    scim: { en: "SCIM", pt: "SCIM" },
    migration: { en: "Migration", pt: "Migração" },
    ai: { en: "AI", pt: "IA" },
    "audit-logs": { en: "Audit logs", pt: "Logs de auditoria" },
    saml: { en: "SAML", pt: "SAML" },
    security: { en: "Security", pt: "Segurança" },
    tls: { en: "TLS", pt: "TLS" },
    "node-js": { en: "Node.js", pt: "Node.js" },
};

export type PostTaxonomy = {
    category?: string;
    tags?: string[];
};
