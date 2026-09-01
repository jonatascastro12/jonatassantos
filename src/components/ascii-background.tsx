const asciiPool = [
    "  { }   [ ]   < >   =>   ::   //   &&   ||   ",
    "  fn    if    for   map   git   npm   pnpm    ",
    "  0x    0b    01    10    {}    []    <>   =>",
    "  ::    //    /*    */   ++   --   !=   ===  ",
    "  let   var   const async await try   catch   ",
    "  use   ref   memo  hook  ctx   jsx   tsx       ",
    "  api   sql   db    orm   env   cli   ssh       ",
    "  tcp   udp   dns   tls   jwt   oauth cors    ",
    "  log   err   warn  info  debug trace stack     ",
    "  src   lib   pkg   dep   dev   prod  test    ",
    "  ===   !==   <=   >=   ??   ?.   |>   <|    ",
    "  import export default return throw yield     ",
    "  class struct enum  type  interface extends   ",
    "  push  pop   shift slice splice filter reduce  ",
    "  true  false null  void  never unknown any   ",
    "  0xFF  0x00  0x1A  0x7E  0x42  0x99  0xCC  0x11",
    "  #include <stdio>  malloc free sizeof void*  ",
    "  SELECT FROM WHERE JOIN ON GROUP BY LIMIT    ",
    "  docker compose up -d --build --force-recreate",
    "  git commit -m \"fix\" && git push origin main  ",
    "  pnpm install && pnpm dev && pnpm build       ",
    "  npm run lint --fix && npm test -- --watch    ",
    "  HTTP/1.1 200 OK  Content-Type: application   ",
    "  POST /api/v1/users  Authorization: Bearer     ",
];

function buildAsciiField(rows: number, seed: number): string {
    const count = asciiPool.length;
    const lines: string[] = [];

    for (let i = 0; i < rows; i++) {
        const index = (i * 17 + i * i * 5 + seed) % count;
        lines.push(asciiPool[index]!);
    }

    return lines.join("\n");
}

const asciiField = buildAsciiField(64, 3);

export function AsciiBackground() {
    return (
        <div className="ambient-bg" aria-hidden="true">
            <div className="ambient-bg__mesh" />
            <div className="ambient-bg__glow" />

            <div className="ambient-bg__ascii-wrap">
                <pre className="ambient-bg__ascii">{asciiField}</pre>
            </div>

            <div className="ambient-bg__vignette" />
        </div>
    );
}
