type SantaListProtector<T> =
	keyof T extends never ? T : {readonly [key in keyof T]: SantaListProtector<T[key]>};

