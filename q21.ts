type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  '
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTacToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTacToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [
  ['  ', '  ', '  '], 
  ['  ', '  ', '  '], 
  ['  ', '  ', '  ']
];

type NewGame = {
  board: EmptyBoard;
  state: '❌';
};

type XPos<S extends TicTacToeXPositions> = S extends "left" ? 0 : S extends "center" ? 1 : 2;

type YPos<S extends TicTacToeYPositions> = S extends "top" ? 0 : S extends "middle" ? 1 : 2;

type Pos<S extends TicTacToePositions> = S extends `${infer Y extends TicTacToeYPositions}-${infer X extends TicTacToeXPositions}` ? [YPos<Y>, XPos<X>] : never;

type FlipState<Chip extends TicTacToeChip> = Chip extends '❌' ? '⭕' : '❌';

type UpdateArr<Arr extends any[], Index extends number, Element, Acc extends any[] = []> =
  Arr extends [infer Head, ...infer Tail] ?
    Acc["length"] extends Index
    ? [...Acc, Element, ...Tail]
    : UpdateArr<Tail, Index, Element, [...Acc, Head]>
  : Acc;

type UpdateArr2D<Arr extends any[][], Index extends [number, number], Element, Acc extends any[][] = []> =
  Arr extends [infer Head extends any[], ...infer Tail extends any[][]] ?
    Acc["length"] extends Index[0]
    ? [...Acc, UpdateArr<Head, Index[1], Element>, ...Tail]
    : UpdateArr2D<Tail, Index, Element, [...Acc, Head]>
  : Acc;

type IsWinner<Board extends TicTacToeBoard, Chip extends TicTacToeChip> =
  [Board[0][0], Board[0][1], Board[0][2]] extends [Chip, Chip, Chip] ? true :
  [Board[1][0], Board[1][1], Board[1][2]] extends [Chip, Chip, Chip] ? true :
  [Board[2][0], Board[2][1], Board[2][2]] extends [Chip, Chip, Chip] ? true :
  [Board[0][0], Board[1][0], Board[2][0]] extends [Chip, Chip, Chip] ? true :
  [Board[0][1], Board[1][1], Board[2][1]] extends [Chip, Chip, Chip] ? true :
  [Board[0][2], Board[1][2], Board[2][2]] extends [Chip, Chip, Chip] ? true :
  [Board[0][0], Board[1][1], Board[2][2]] extends [Chip, Chip, Chip] ? true :
  [Board[0][2], Board[1][1], Board[2][0]] extends [Chip, Chip, Chip] ? true :
  false;

type Count<A extends string[], B extends string, ACC extends string[] = []> =
  A extends [...infer XS extends string[], infer X extends string] ?
    X extends B ? Count<XS, B, [...ACC, X]> : Count<XS, B, ACC>
  : ACC["length"];

type Flatten<A extends any[][], ACC extends any[] = []> =
  A extends [infer F extends any[], ...infer R extends any[][]] ? Flatten<R, [...ACC, ...F]> : ACC;

type IsDraw<Board extends TicTacToeBoard> =
  Count<Flatten<Board>, "  "> extends 0 ? true : false;

type GetNewState<Board extends TicTacToeBoard, State extends TicTacToeState> =
  State extends TicTacToeEndState ? State :
  State extends TicTacToeChip ?
    IsWinner<Board, State> extends true ? `${State} Won` :
    IsDraw<Board> extends true ? `Draw` :
    FlipState<State>
  : never;

type CreateState<Board extends TicTacToeBoard, State extends TicTacToeState> = {
  board: Board,
  state: GetNewState<Board, State>
};

type IsValidMove<Game extends TicTacToeGame, Move extends TicTacToePositions> =
  Pos<Move> extends [infer Y extends number, infer X extends number] ?
    Game["board"][Y][X] extends "  " ? true : false
  : never;

type TicTacToe<Game extends TicTacToeGame, Move extends TicTacToePositions> =
  IsValidMove<Game, Move> extends true ?
    CreateState<UpdateArr2D<Game["board"], Pos<Move>, Game["state"]>, Game["state"]>
  : Game;

