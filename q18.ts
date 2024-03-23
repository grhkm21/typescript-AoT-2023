type Count<A extends string[], B extends string, ACC extends string[] = []> =
	A extends [...infer XS extends string[], infer X extends string] ?
		X extends B ? Count<XS, B, [...ACC, X]> : Count<XS, B, ACC>
	: ACC["length"];
