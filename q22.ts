/** because "dashing" implies speed */
type Dasher = '💨';

/** representing dancing or grace */
type Dancer = '💃';

/** a deer, prancing */
type Prancer = '🦌';

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = '🌟';

/** for the celestial body that shares its name */
type Comet = '☄️';

/** symbolizing love, as Cupid is the god of love */
type Cupid = '❤️';

/** representing thunder, as "Donner" means thunder in German */
type Donner = '🌩️';

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = '⚡';

/** for his famous red nose */
type Rudolph = '🔴';

type IsElement<E, A extends any[]> =
  A extends [infer _ extends E, ...infer __] ? true :
  A extends [infer _, ...infer Rest extends any[]] ? IsElement<E, Rest> :
  false;

type AllEqual<Arr extends any[], Target = undefined> =
	Target extends undefined ?
    Arr extends [infer Head extends any, ...infer _] ? AllEqual<Arr, Head> : never
	:
		Arr extends [infer _ extends Target, ...infer Tail extends any[]] ? AllEqual<Tail, Target> :
		Arr extends [infer _, ...infer __] ? false :
		true;

// type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;
type ValidSet<Arr extends string[]> = AllEqual<[
  IsElement<Dasher, Arr>,
  IsElement<Dancer, Arr>,
  IsElement<Prancer, Arr>,
  IsElement<Vixen, Arr>,
  IsElement<Comet, Arr>,
  IsElement<Cupid, Arr>,
  IsElement<Donner, Arr>,
  IsElement<Blitzen, Arr>,
  IsElement<Rudolph, Arr>,
], true>;

type Validate<Board extends string[][][]> = AllEqual<[
	ValidSet<[Board[0][0][0], Board[0][0][1], Board[0][0][2], Board[0][1][0], Board[0][1][1], Board[0][1][2], Board[0][2][0], Board[0][2][1], Board[0][2][2]]>,
	ValidSet<[Board[1][0][0], Board[1][0][1], Board[1][0][2], Board[1][1][0], Board[1][1][1], Board[1][1][2], Board[1][2][0], Board[1][2][1], Board[1][2][2]]>,
	ValidSet<[Board[2][0][0], Board[2][0][1], Board[2][0][2], Board[2][1][0], Board[2][1][1], Board[2][1][2], Board[2][2][0], Board[2][2][1], Board[2][2][2]]>,
	ValidSet<[Board[3][0][0], Board[3][0][1], Board[3][0][2], Board[3][1][0], Board[3][1][1], Board[3][1][2], Board[3][2][0], Board[3][2][1], Board[3][2][2]]>,
	ValidSet<[Board[4][0][0], Board[4][0][1], Board[4][0][2], Board[4][1][0], Board[4][1][1], Board[4][1][2], Board[4][2][0], Board[4][2][1], Board[4][2][2]]>,
	ValidSet<[Board[5][0][0], Board[5][0][1], Board[5][0][2], Board[5][1][0], Board[5][1][1], Board[5][1][2], Board[5][2][0], Board[5][2][1], Board[5][2][2]]>,
	ValidSet<[Board[6][0][0], Board[6][0][1], Board[6][0][2], Board[6][1][0], Board[6][1][1], Board[6][1][2], Board[6][2][0], Board[6][2][1], Board[6][2][2]]>,
	ValidSet<[Board[7][0][0], Board[7][0][1], Board[7][0][2], Board[7][1][0], Board[7][1][1], Board[7][1][2], Board[7][2][0], Board[7][2][1], Board[7][2][2]]>,
	ValidSet<[Board[8][0][0], Board[8][0][1], Board[8][0][2], Board[8][1][0], Board[8][1][1], Board[8][1][2], Board[8][2][0], Board[8][2][1], Board[8][2][2]]>,
	ValidSet<[Board[0][0][0], Board[1][0][0], Board[2][0][0], Board[3][0][0], Board[4][0][0], Board[5][0][0], Board[6][0][0], Board[7][0][0], Board[8][0][0]]>,
	ValidSet<[Board[0][0][1], Board[1][0][1], Board[2][0][1], Board[3][0][1], Board[4][0][1], Board[5][0][1], Board[6][0][1], Board[7][0][1], Board[8][0][1]]>,
	ValidSet<[Board[0][0][2], Board[1][0][2], Board[2][0][2], Board[3][0][2], Board[4][0][2], Board[5][0][2], Board[6][0][2], Board[7][0][2], Board[8][0][2]]>,
	ValidSet<[Board[0][1][0], Board[1][1][0], Board[2][1][0], Board[3][1][0], Board[4][1][0], Board[5][1][0], Board[6][1][0], Board[7][1][0], Board[8][1][0]]>,
	ValidSet<[Board[0][1][1], Board[1][1][1], Board[2][1][1], Board[3][1][1], Board[4][1][1], Board[5][1][1], Board[6][1][1], Board[7][1][1], Board[8][1][1]]>,
	ValidSet<[Board[0][1][2], Board[1][1][2], Board[2][1][2], Board[3][1][2], Board[4][1][2], Board[5][1][2], Board[6][1][2], Board[7][1][2], Board[8][1][2]]>,
	ValidSet<[Board[0][2][0], Board[1][2][0], Board[2][2][0], Board[3][2][0], Board[4][2][0], Board[5][2][0], Board[6][2][0], Board[7][2][0], Board[8][2][0]]>,
	ValidSet<[Board[0][2][1], Board[1][2][1], Board[2][2][1], Board[3][2][1], Board[4][2][1], Board[5][2][1], Board[6][2][1], Board[7][2][1], Board[8][2][1]]>,
	ValidSet<[Board[0][2][2], Board[1][2][2], Board[2][2][2], Board[3][2][2], Board[4][2][2], Board[5][2][2], Board[6][2][2], Board[7][2][2], Board[8][2][2]]>,
	ValidSet<[Board[0][0][0], Board[0][0][1], Board[0][0][2], Board[1][0][0], Board[1][0][1], Board[1][0][2], Board[2][0][0], Board[2][0][1], Board[2][0][2]]>,
	ValidSet<[Board[0][1][0], Board[0][1][1], Board[0][1][2], Board[1][1][0], Board[1][1][1], Board[1][1][2], Board[2][1][0], Board[2][1][1], Board[2][1][2]]>,
	ValidSet<[Board[0][2][0], Board[0][2][1], Board[0][2][2], Board[1][2][0], Board[1][2][1], Board[1][2][2], Board[2][2][0], Board[2][2][1], Board[2][2][2]]>,
	ValidSet<[Board[3][0][0], Board[3][0][1], Board[3][0][2], Board[4][0][0], Board[4][0][1], Board[4][0][2], Board[5][0][0], Board[5][0][1], Board[5][0][2]]>,
	ValidSet<[Board[3][1][0], Board[3][1][1], Board[3][1][2], Board[4][1][0], Board[4][1][1], Board[4][1][2], Board[5][1][0], Board[5][1][1], Board[5][1][2]]>,
	ValidSet<[Board[3][2][0], Board[3][2][1], Board[3][2][2], Board[4][2][0], Board[4][2][1], Board[4][2][2], Board[5][2][0], Board[5][2][1], Board[5][2][2]]>,
	ValidSet<[Board[6][0][0], Board[6][0][1], Board[6][0][2], Board[7][0][0], Board[7][0][1], Board[7][0][2], Board[8][0][0], Board[8][0][1], Board[8][0][2]]>,
	ValidSet<[Board[6][1][0], Board[6][1][1], Board[6][1][2], Board[7][1][0], Board[7][1][1], Board[7][1][2], Board[8][1][0], Board[8][1][1], Board[8][1][2]]>,
	ValidSet<[Board[6][2][0], Board[6][2][1], Board[6][2][2], Board[7][2][0], Board[7][2][1], Board[7][2][2], Board[8][2][0], Board[8][2][1], Board[8][2][2]]>
], true> extends true ? true : false;
