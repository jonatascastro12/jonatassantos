const asciiTile = [
    "  { }   [ ]   < >   =>   ::   //   &&   ||   ",
    "  fn    if    for   map   git   npm   pnpm    ",
    "  0x    0b    01    10    {}    []    <>   =>",
    "  ::    //    /*    */   ++   --   !=   ===  ",
    "  $     #     ~     ^     &     |     ?     ",
    "  def   var   let   new   try   log   dev   ",
    "  =>    <-    |>    <|    ::    ..    /**   ",
    "  [x]   ( )   { }   < >   //    &&    ||    ",
].join("\n");

const asciiField = `${asciiTile}\n`.repeat(14);

function WaveLayer({ className }: { className: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="currentColor"
                d="M0,192L48,197.3C96,203,192,213,288,218.7C384,224,480,224,576,208C672,192,768,160,864,154.7C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
        </svg>
    );
}

export function AsciiBackground() {
    return (
        <div className="ambient-bg" aria-hidden="true">
            <div className="ambient-bg__mesh" />
            <div className="ambient-bg__grid" />
            <WaveLayer className="ambient-bg__wave ambient-bg__wave--back" />
            <WaveLayer className="ambient-bg__wave ambient-bg__wave--front" />
            <div className="ambient-bg__ascii-wrap">
                <pre className="ambient-bg__ascii">{asciiField}</pre>
            </div>
            <div className="ambient-bg__vignette" />
        </div>
    );
}
