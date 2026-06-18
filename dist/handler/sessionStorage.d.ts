export declare const getAllSessionStorageKey: () => void;
export declare const getAllSessionStorageInfo: () => void;
export declare const getAllSessionStorage: () => {
    key: string;
    value: string;
    size: string;
    type: string;
    entryCount: number | null;
    capturedAt: string;
}[];
