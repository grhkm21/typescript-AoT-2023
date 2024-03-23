type RemoveNaughtyChildren<T> = { [key in keyof T as key extends `naughty_${infer _}` ? never : key]: T[key] };
