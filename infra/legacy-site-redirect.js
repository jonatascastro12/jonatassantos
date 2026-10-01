// Prepared for a CloudFront viewer-request association on jonatascastro.com.
// Activate only after the destination articles are published. Unknown paths retain the S3 origin.
var redirects = {
  "/": "/pt/blog",
  "/page/2": "/pt/blog",
  "/zapier-e-outras-ferramentas": "/pt/blog/zapier-e-outras-ferramentas",
  "/dicas-de-percepcao-musical-como-descobrir-o-tom-de-uma-musica": "/pt/blog/dicas-de-percepcao-musical-como-descobrir-o-tom-de-uma-musica",
  "/descomplicando-midi": "/pt/blog/descomplicando-midi",
  "/tabela-de-controles-midi-em-portugues": "/pt/blog/tabela-de-controles-midi-em-portugues",
  "/chave-de-sucesso-para-o-marketing-de-afiliados-gestao-de-leads": "/pt/blog/chave-de-sucesso-para-o-marketing-de-afiliados-gestao-de-leads",
  "/os-tipos-de-teclado-musical-controladores-arranjadores-sintetizadores-workstations-e-pianos-digitais": "/pt/blog/os-tipos-de-teclado-musical-controladores-arranjadores-sintetizadores-workstations-e-pianos-digitais",
  "/guia-para-utilizar-teclado-samplers-vsts": "/pt/blog/guia-para-utilizar-teclado-samplers-vsts",
  "/12-escalas-maiores-naturalidade-ao-piano": "/pt/blog/12-escalas-maiores-naturalidade-ao-piano",
  "/7-passos-para-criar-listas-de-e-mail-do-zero": "/pt/blog/7-passos-para-criar-listas-de-e-mail-do-zero",
  "/sacada-de-piano-1-acorde-5-1-2-5": "/pt/blog/sacada-de-piano-1-acorde-5-1-2-5",
  "/escalas-maiores-sol-maior-curso-de-piano-2": "/pt/blog/escalas-maiores-sol-maior-curso-de-piano-2",
  "/escalas-maiores-maior-curso-piano": "/pt/blog/escalas-maiores-maior-curso-piano",
  "/como-misturar-varios-timbres-no-teclado": "/pt/blog/como-misturar-varios-timbres-no-teclado",
  "/7-maneiras-de-evitar-que-seus-e-mails-cheguem-como-spam": "/pt/blog/7-maneiras-de-evitar-que-seus-e-mails-cheguem-como-spam",
  "/como-faco-logotipos-na-maioria-das-vezes": "/pt/blog/como-faco-logotipos-na-maioria-das-vezes",
  "/projeto-mana-do-ceu": "/pt/blog/projeto-mana-do-ceu"
};
var wordpressIds = {
  "621": "/pt/blog/zapier-e-outras-ferramentas",
  "558": "/pt/blog/dicas-de-percepcao-musical-como-descobrir-o-tom-de-uma-musica",
  "495": "/pt/blog/descomplicando-midi",
  "511": "/pt/blog/tabela-de-controles-midi-em-portugues",
  "478": "/pt/blog/chave-de-sucesso-para-o-marketing-de-afiliados-gestao-de-leads",
  "353": "/pt/blog/os-tipos-de-teclado-musical-controladores-arranjadores-sintetizadores-workstations-e-pianos-digitais",
  "315": "/pt/blog/guia-para-utilizar-teclado-samplers-vsts",
  "265": "/pt/blog/12-escalas-maiores-naturalidade-ao-piano",
  "263": "/pt/blog/7-passos-para-criar-listas-de-e-mail-do-zero",
  "185": "/pt/blog/sacada-de-piano-1-acorde-5-1-2-5",
  "157": "/pt/blog/escalas-maiores-sol-maior-curso-de-piano-2",
  "116": "/pt/blog/escalas-maiores-maior-curso-piano",
  "81": "/pt/blog/como-misturar-varios-timbres-no-teclado",
  "86": "/pt/blog/7-maneiras-de-evitar-que-seus-e-mails-cheguem-como-spam",
  "45": "/pt/blog/como-faco-logotipos-na-maioria-das-vezes",
  "30": "/pt/blog/projeto-mana-do-ceu"
};

function handler(event) {
    var request = event.request;
    var uri = request.uri.replace(/\/$/, "") || "/";
    var destination = redirects[uri];
    if (uri === "/" && request.querystring.p) {
        destination = wordpressIds[request.querystring.p.value];
    }
    if (!destination) return request;
    return {
        statusCode: 301,
        statusDescription: "Moved Permanently",
        headers: {
            location: { value: "https://www.jonatassantos.me" + destination },
            "cache-control": { value: "public, max-age=3600" }
        }
    };
}
