type DayCounter<S extends number, E extends number, ACC extends number[] = [0]> =
	ACC extends { length: infer Len extends number; } ?
		Len extends E ? S | Len : DayCounter<S | Len, E, [...ACC, Len]>
	: never;
