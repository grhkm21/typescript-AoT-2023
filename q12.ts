type FindSanta<T extends readonly any[]> =
	T extends [...infer Front, infer Back] ?
		Back extends "🎅🏼" ? Front["length"] : FindSanta<Front>
	: never;
