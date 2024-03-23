type Letters = {
  A: [
    '█▀█ ',
    '█▀█ ',
    '▀ ▀ ',
  ],
  B: [
    '█▀▄ ',
    '█▀▄ ',
    '▀▀  '
  ],
  C: [
    '█▀▀ ',
    '█ ░░',
    '▀▀▀ '
  ],
  E: [
    '█▀▀ ',
    '█▀▀ ',
    '▀▀▀ '
  ],
  H: [
    '█ █ ',
    '█▀█ ',
    '▀ ▀ '
  ],
  I: [
    '█ ',
    '█ ',
    '▀ '
  ],
  M: [
    '█▄░▄█ ',
    '█ ▀ █ ',
    '▀ ░░▀ '
  ],
  N: [
    '█▄░█ ',
    '█ ▀█ ',
    '▀ ░▀ '
  ],
  P: [
    '█▀█ ',
    '█▀▀ ',
    '▀ ░░'
  ],
  R: [
    '█▀█ ',
    '██▀ ',
    '▀ ▀ '
  ],
  S: [
    '█▀▀ ',
    '▀▀█ ',
    '▀▀▀ '
  ],
  T: [
    '▀█▀ ',
    '░█ ░',
    '░▀ ░'
  ],
  Y: [
    '█ █ ',
    '▀█▀ ',
    '░▀ ░'
  ],
  W: [
    '█ ░░█ ',
    '█▄▀▄█ ',
    '▀ ░ ▀ '
  ],
  ' ': [
    '░',
    '░',
    '░'
  ],
  ':': [
    '#',
    '░',
    '#'
  ],
  '*': [
    '░',
    '#',
    '░'
  ],
};

type GetLetter<S extends string, T = Uppercase<S>> = T extends keyof Letters ? Letters[T] : [T, T, T];

type SplitString<S extends string> =
  S extends `${infer a extends string}\n${infer b extends string}`
  ? [a, ...SplitString<b>]
  : [S]

type ToAsciiArt1<S extends string, N extends number> =
  S extends `${infer a extends string}${infer b extends string}` ?
    ToAsciiArt1<b, N> extends infer R ? R extends string ? `${GetLetter<a>[N]}${R}` : never : never
  : "";

type Rotate<S extends any[]> =
  S extends [infer Front, ...infer Rest] ?
    [...Rotate<Rest>, Front]
  : [];

type Interweave<S extends any[][]> =
  S extends [infer FrontArr, ...infer RestArr extends any[]] ?
    FrontArr extends [infer Front, ...infer Rest] ?
      [Front, ...Interweave<[...RestArr, Rest]>]
    : Interweave<RestArr>
  : [];

type ToAsciiArt<S extends string> =
  Interweave<[
    SplitString<ToAsciiArt1<S, 0>>,
    SplitString<ToAsciiArt1<S, 1>>,
    SplitString<ToAsciiArt1<S, 2>>
  ]>;

