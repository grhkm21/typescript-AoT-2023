type BoxToys<T extends string, N extends number, R extends any[] = []> =
    N extends R["length"] ? R : BoxToys<T, N, [...R, T]>;

