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

export function AsciiBackground() {
    return (
        <div className="ascii-bg" aria-hidden="true">
            <pre className="ascii-bg__grid">{`${asciiTile}\n`.repeat(18)}</pre>
            <div className="ascii-bg__shade" />
        </div>
    );
}
