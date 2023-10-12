

export interface ServerLogPayload {
    errorMessage: unknown
    file: string
    lineNumber: string
    user?: string
}

export interface HumanReadableDate {
    day: number;
    weekday: string;
    monthAbbreviation: string;
    monthIndexString: string
}


export type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}