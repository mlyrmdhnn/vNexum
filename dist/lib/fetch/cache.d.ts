export interface CacheEntry<T = any> {
    data: T;
    desc?: string;
    timestamp?: number;
    lastUpdated?: string;
}
export declare const getCache: <T = any>(key: string) => T | null;
export declare const setCache: <T = any>(key: string, data: T, desc?: string) => void;
export declare const isEqualCache: (a: any, b: any) => boolean;
export declare const removeCache: (key: string) => void;
export declare const clearCacheByKey: (cacheKey: string) => void;
