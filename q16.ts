type FindSantaRow<T> =
	T extends [...infer Front, infer Back] ?
		Back extends "🎅🏼" ? Front["length"] : FindSantaRow<Front>
	: never;

type FindSanta<T> =
	T extends [...infer Front, infer Back] ?
		FindSantaRow<Back> extends never ? FindSanta<Front> : [Front["length"], FindSantaRow<Back>]
	: never;
