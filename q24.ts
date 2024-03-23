type Alley = "  ";
type Tree = "🎄";
type Santa = "🎅";
type MazeItem = Tree | Santa | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

type Size = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Increment<N extends Size> = [1, 2, 3, 4, 5, 6, 7, 8, 9, "out"][N];
type Decrement<N extends Size> = ["out", 0, 1, 2, 3, 4, 5, 6, 7, 8][N];

type _C0 = DELICIOUS_COOKIES;
type _C1 = [_C0, _C0, _C0, _C0, _C0, _C0, _C0, _C0, _C0, _C0];
type FillCookies = [_C1, _C1, _C1, _C1, _C1, _C1, _C1, _C1, _C1, _C1];

type ApplyDir<Pos extends [Size, Size], Dir extends Directions> =
  Pos extends [infer Row extends Size, infer Column extends Size] ?
  Dir extends "up" ? [Decrement<Row>, Column] :
  Dir extends "down" ? [Increment<Row>, Column] :
  Dir extends "left" ? [Row, Decrement<Column>] :
  Dir extends "right" ? [Row, Increment<Column>] :
  never :
  never;

type IndexOf<T extends string[][], E extends string = Santa> = [
  keyof {[K in Size as (E extends T[K][Size] ? K : never)]: K},
  keyof {[K in Size as (E extends T[Size][K] ? K : never)]: K}
];

type SetAt<A extends any[], I extends number, E, Acc extends any[] = []> =
  A extends [infer Head, ...infer Rest extends any[]] ?
  Acc["length"] extends I ? [...Acc, E, ...Rest] : SetAt<Rest, I, E, [...Acc, Head]>
  : Acc;

type SetAt2D<A extends any[][], I extends [number, number], E, Acc extends any[][] = []> =
  A extends [infer Head extends any[], ...infer Rest extends any[][]] ?
  Acc["length"] extends I[0] ? [...Acc, SetAt<Head, I[1], E>, ...Rest] :
  SetAt2D<Rest, I, E, [...Acc, Head]>
  : Acc;

type ClearAt<Maze extends MazeMatrix, Pos extends [Size, Size]> =
  SetAt2D<Maze, Pos, Alley>;

type MoveTo<Maze extends MazeMatrix, Pos extends [Size, Size]> =
  SetAt2D<Maze, Pos, Santa>;

type Move<Maze extends MazeMatrix, Dir extends Directions> =
  IndexOf<Maze> extends infer CurPos extends [Size, Size] ?
    ApplyDir<CurPos, Dir> extends infer NextPos ?
      NextPos extends [infer Row extends Size, infer Column extends Size] ?
        Maze[Row][Column] extends Tree ?
          Maze
        : MoveTo<ClearAt<Maze, CurPos>, NextPos>
      : FillCookies
    : never
  : never;


