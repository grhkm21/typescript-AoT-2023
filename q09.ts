type Reverse<T extends string> =
	T extends `${infer x}${infer xs}` ? `${Reverse<xs>}${x}` : "";
