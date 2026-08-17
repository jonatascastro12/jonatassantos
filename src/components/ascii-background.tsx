const asciiTile = [
    "  { }   [ ]   < >   =>   ::   //   &&   ||   ",
    "  fn    if    for   map   git   npm   pnpm    ",
    "  0x    0b    01    10    {}    []    <>   =>",
    "  ::    //    /*    */   ++   --   !=   ===  ",
].join("\n");

const asciiField = `${asciiTile}\n`.repeat(10);

type WaveStripProps = {
    className: string;
    path: string;
    duration: string;
};

function WaveStrip({ className, path, duration }: WaveStripProps) {
    const svg = (
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d={path} />
        </svg>
    );

    return (
        <div className={`wave-strip ${className}`} style={{ animationDuration: duration }}>
            {svg}
            {svg}
        </div>
    );
}

const wavePaths = {
    soft:
        "M0,100 C360,150 360,50 720,100 C1080,150 1080,50 1440,100 L1440,200 L0,200 Z",
    deep:
        "M0,115 C360,75 360,145 720,115 C1080,75 1080,145 1440,115 L1440,200 L0,200 Z",
    crest:
        "M0,90 C240,130 480,50 720,90 C960,130 1200,50 1440,90 L1440,200 L0,200 Z",
};

export function AsciiBackground() {
    return (
        <div className="ambient-bg" aria-hidden="true">
            <div className="ambient-bg__mesh" />
            <div className="ambient-bg__blobs">
                <span className="ambient-bg__blob ambient-bg__blob--one" />
                <span className="ambient-bg__blob ambient-bg__blob--two" />
            </div>

            <div className="ambient-bg__waves ambient-bg__waves--top">
                <WaveStrip className="wave-strip--slow wave-strip--reverse" path={wavePaths.soft} duration="32s" />
            </div>

            <div className="ambient-bg__waves ambient-bg__waves--mid">
                <WaveStrip className="wave-strip--mid" path={wavePaths.crest} duration="22s" />
                <WaveStrip className="wave-strip--fast wave-strip--reverse" path={wavePaths.deep} duration="16s" />
            </div>

            <div className="ambient-bg__waves ambient-bg__waves--bottom">
                <WaveStrip className="wave-strip--slow" path={wavePaths.deep} duration="26s" />
                <WaveStrip className="wave-strip--mid wave-strip--reverse" path={wavePaths.soft} duration="18s" />
                <WaveStrip className="wave-strip--fast" path={wavePaths.crest} duration="12s" />
            </div>

            <div className="ambient-bg__ascii-wrap">
                <pre className="ambient-bg__ascii">{asciiField}</pre>
            </div>

            <div className="ambient-bg__vignette" />
        </div>
    );
}
