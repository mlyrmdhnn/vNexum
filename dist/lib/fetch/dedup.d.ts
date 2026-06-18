export declare const buildDedupKey: (endpoint: string, method: string, params: Record<string, any>) => string;
export declare const getDedupRequest: (key: string) => Promise<any> | undefined;
export declare const setDedupRequest: (key: string, promise: Promise<any>) => void;
export declare const deleteDedupRequest: (key: string) => void;
