

export interface ServerLogPayload {
    timestamp: Date
    errorMessage: unknown
    file: string
    lineNumber: string
}

export interface HumanReadableDate {
    day: number;
    weekday: string;
    monthAbbreviation: string;
    monthIndexString: string
}
