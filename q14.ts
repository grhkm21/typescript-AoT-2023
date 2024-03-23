type DecipherNaughtyList<S extends string> =
	S extends `${infer A}/${infer B}` ? A | DecipherNaughtyList<B> : S;

