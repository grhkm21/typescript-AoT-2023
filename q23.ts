type Connect4Red = '🔴';
type Connect4Yellow = '🟡';
type Connect4Empty = '  ';
type Connect4Chips = Connect4Red | Connect4Yellow;
type Connect4Cell = Connect4Chips | Connect4Empty;
type Connect4Ended = '🔴 Won' | '🟡 Won' | 'Draw';
type Connect4State = Connect4Chips | Connect4Ended;
type Connect4Row = Connect4Cell[];
type Connect4Board = Connect4Row[];
type Connect4Game = { board: Connect4Board, state: Connect4State };

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];

type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type Increment<N extends number, Acc extends any[] = []> =
  Acc["length"] extends N ? [...Acc, never]["length"] : Increment<N, [...Acc, never]>;

type Head<Row extends any[]> = Row extends [infer H, ...infer _] ? H : never;

type Heads<Rows extends any[][], Acc extends any[] = []> =
  Rows extends [infer H extends any[], ...infer R extends any[][]] ? Heads<R, [...Acc, Head<H>]> : Acc;

type Tail<Row extends any[]> = Row extends [infer _, ...infer T] ? T : never;

type Tails<Rows extends any[][], Acc extends any[][] = []> =
  Rows extends [infer H extends any[], ...infer R extends any[][]] ? Tails<R, [...Acc, Tail<H>]> : Acc;

type Reverse<Row extends any[]> = Row extends [infer H, ...infer T] ? [...Reverse<T>, H] : [];

type ReverseBoard<Board extends any[][], Acc extends any[][] = []> =
  Board extends [infer H extends any[], ...infer R extends any[][]] ? ReverseBoard<R, [...Acc, Reverse<H>]> : Acc;

type ReverseGame<Game extends Connect4Game> = {
  board: ReverseBoard<Game["board"]>,
  state: Game["state"]
};

type Transpose<Board extends any[][], Acc extends any[][] = []> =
  Board[0]["length"] extends 0 ? Acc : Transpose<Tails<Board>, [...Acc, Heads<Board>]>;

type TransposeGame<Game extends Connect4Game> = {
  board: Transpose<Game["board"]>,
  state: Game["state"]
};

type IndexOf<Row extends any[], E, Acc extends number = 0> =
  Row["length"] extends Acc ? never :
  Row[Acc] extends E ? Acc : IndexOf<Row, E, Increment<Acc>>;

type SetAt<Board extends any[], I extends number, E, Acc extends any[] = []> =
  Board extends [infer H, ...infer T]
  ? Acc["length"] extends I ? [...Acc, E, ...T] : SetAt<T, I, E, [...Acc, H]>
  : never;

type SetAt2D<Board extends any[][], I extends [number, number], E, Acc extends any[][] = []> =
  Board extends [infer H extends any[], ...infer T extends any[][]]
  ? Acc["length"] extends I[0] ? [...Acc, SetAt<H, I[1], E>, ...T] : SetAt2D<T, I, E, [...Acc, H]>
  : never;

type Flatten<Board extends any[][], Acc extends any[] = []> =
  Board extends [infer H extends any[], ...infer T extends any[][]] ? Flatten<T, [...Acc, ...H]> : Acc;

type Diagonals<Board extends Connect4Board> = [
  [Board[0][0]],
  [Board[0][1], Board[1][0]],
  [Board[0][2], Board[1][1], Board[2][0]],
  [Board[0][3], Board[1][2], Board[2][1], Board[3][0]],
  [Board[0][4], Board[1][3], Board[2][2], Board[3][1], Board[4][0]],
  [Board[0][5], Board[1][4], Board[2][3], Board[3][2], Board[4][1], Board[5][0]],
  [Board[1][5], Board[2][4], Board[3][3], Board[4][2], Board[5][1], Board[6][0]],
  [Board[2][5], Board[3][4], Board[4][3], Board[5][2], Board[6][1]],
  [Board[3][5], Board[4][4], Board[5][3], Board[6][2]],
  [Board[4][5], Board[5][4], Board[6][3]],
  [Board[5][5], Board[6][4]],
  [Board[6][5]]
]

type IsWinnerRow<Row extends Connect4Row, C extends Connect4Chips> =
  Row extends [C, C, C, C, ...infer _] ? true :
  Row extends [infer _, ...infer R extends Connect4Row] ? IsWinnerRow<R, C> :
  false;

type IsWinnerRows<Rows extends Connect4Board, C extends Connect4Chips> =
  Rows extends [infer H extends Connect4Row, ...infer T extends Connect4Board]
  ? IsWinnerRow<H, C> extends true ? true : IsWinnerRows<T, C>
  : false;

type IsWinner<Board extends Connect4Board, C extends Connect4Chips> =
  IsWinnerRows<Board, C> extends true ? true :
  IsWinnerRows<Transpose<Board>, C> extends true ? true :
  IsWinnerRows<Diagonals<Board>, C> extends true ? true :
  ReverseBoard<Board> extends Connect4Board ?
  Diagonals<ReverseBoard<Board>> extends Connect4Board ?
  IsWinnerRows<Diagonals<ReverseBoard<Board>>, C> extends true ? true : false : false : false;

type IsDraw<Board extends Connect4Board> =
  IndexOf<Flatten<Board>, Connect4Empty> extends never ? true : false;

type FlipChip<C extends Connect4Chips> =
  C extends Connect4Red ? Connect4Yellow : Connect4Red;

type UpdateState<Board extends Connect4Board, S extends Connect4State> = {
  board: Board,
  state: S extends Connect4Chips ?
    IsWinner<Board, S> extends true ? `${S} Won` :
    IsDraw<Board> extends true ? "Draw" :
    FlipChip<S>
  : S;
};

type Connect4C<Game extends Connect4Game, C extends number> =
  Game["board"][C] extends infer Col ? Col extends any[] ?
  IndexOf<Col, Connect4Empty> extends infer I ?
  I extends never ? Game :
  I extends number ? UpdateState<SetAt2D<Game["board"], [C, I], Game["state"]>, Game["state"]>
  : never : never : never : never;

type Connect4<Game extends Connect4Game, C extends number> =
  TransposeGame<ReverseGame<Connect4C<ReverseGame<TransposeGame<Game>>, C>>>;
