import { HttpHeaders } from './types';
type StatusHookFn = (error: any) => void | Promise<void>;
export interface FetchConfigInstance {
    baseURL: string;
    headers: HttpHeaders;
    statusHooks: {
        status: number;
        fn: StatusHookFn;
    }[];
}
export declare const globalConfig: FetchConfigInstance;
export declare const createConfig: (initial?: Partial<FetchConfigInstance>) => FetchConfigInstance;
export declare const fetchConfig: {
    baseURL(url: string): void;
    getBaseURL(): string;
    headers(headers: HttpHeaders): void;
    getHeaders(): HttpHeaders;
    onError(status: number, fn: StatusHookFn): void;
};
export {};
