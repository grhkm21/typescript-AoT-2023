type StreetSuffixTester<S extends string, T extends string> =
	S extends `${infer _}${T}` ? true : false;
