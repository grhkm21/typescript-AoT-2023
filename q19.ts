type Rotate<S extends string[]> =
	S extends [infer X extends string, ...infer XS extends string[]] ? [...XS, X] : [];

type Gift = ["🛹", "🚲", "🛴", "🏄"];

type Front<S extends any[]> = S extends [infer X, ...infer XS] ? X : never;

type Iter<S extends any, N extends number, ACC extends any[] = []> =
	ACC["length"] extends N ? ACC : Iter<S, N, [...ACC, S]>;

type Rebuild<Arr extends number[], S extends string[] = Gift> =
	Arr extends [infer N extends number, ...infer Rest extends number[]] ?
		[...Iter<Front<S>, N>, ...Rebuild<Rest, Rotate<S>>]
	: [];
