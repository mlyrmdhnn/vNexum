import { HttpOptions, HttpHeaders, RequestInterceptorFn, ResponseInterceptorFn, ErrorInterceptorFn } from '../lib/fetch/types';
import { createInterceptor } from '../lib/fetch/interceptor';
import { FetchConfigInstance } from '../lib/fetch/config';
export interface UseFetchStatic {
    baseURL: (url: string) => void;
    headers: (headers: HttpHeaders) => void;
    onError: (status: number, fn: (error: any) => void) => void;
    interceptor: {
        request: {
            use: (fn: RequestInterceptorFn) => number;
            push: (fn: RequestInterceptorFn) => number;
            eject: (id: number) => void;
        };
        response: {
            use: (fn: ResponseInterceptorFn) => number;
            push: (fn: ResponseInterceptorFn) => number;
            eject: (id: number) => void;
        };
        error: {
            use: (fn: ErrorInterceptorFn) => number;
            push: (fn: ErrorInterceptorFn) => number;
            eject: (id: number) => void;
        };
    };
    create: (config: Partial<FetchConfigInstance>) => UseFetchInstance;
}
export type UseFetchInstance = {
    <T>(endpoint: string, options?: HttpOptions): ReturnType<typeof buildUseFetch<T>>;
    baseURL: (url: string) => void;
    headers: (headers: HttpHeaders) => void;
    onError: (status: number, fn: (error: any) => void) => void;
    interceptor: UseFetchStatic['interceptor'];
};
declare function buildUseFetch<T>(endpoint: string, options?: HttpOptions, instanceConfig?: FetchConfigInstance, instanceInterceptors?: ReturnType<typeof createInterceptor>): {
    data: [T | null] extends [import('vue').Ref<any, any>] ? import('@vue/shared').IfAny<import('vue').Ref<any, any> & T, import('vue').Ref<import('vue').Ref<any, any> & T, import('vue').Ref<any, any> & T>, import('vue').Ref<any, any> & T> : import('vue').Ref<import('vue').UnwrapRef<T> | null, T | import('vue').UnwrapRef<T> | null>;
    error: import('vue').Ref<any, any>;
    pending: import('vue').Ref<boolean, boolean>;
    status: import('vue').Ref<"idle" | "pending" | "success" | "error", "idle" | "pending" | "success" | "error">;
    links: import('vue').Ref<any[], any[]>;
    from: import('vue').Ref<number, number>;
    to: import('vue').Ref<number, number>;
    total: import('vue').Ref<number, number>;
    currentPage: import('vue').Ref<number, number>;
    statusCode: import('vue').Ref<number, number>;
    execute: () => Promise<any>;
    refresh: () => Promise<any>;
    clear: () => void;
    abort: () => void;
};
declare function useFetch<T>(endpoint: string, options?: HttpOptions): {
    data: [T | null] extends [import('vue').Ref<any, any>] ? import('@vue/shared').IfAny<import('vue').Ref<any, any> & T, import('vue').Ref<import('vue').Ref<any, any> & T, import('vue').Ref<any, any> & T>, import('vue').Ref<any, any> & T> : import('vue').Ref<import('vue').UnwrapRef<T> | null, T | import('vue').UnwrapRef<T> | null>;
    error: import('vue').Ref<any, any>;
    pending: import('vue').Ref<boolean, boolean>;
    status: import('vue').Ref<"idle" | "pending" | "success" | "error", "idle" | "pending" | "success" | "error">;
    links: import('vue').Ref<any[], any[]>;
    from: import('vue').Ref<number, number>;
    to: import('vue').Ref<number, number>;
    total: import('vue').Ref<number, number>;
    currentPage: import('vue').Ref<number, number>;
    statusCode: import('vue').Ref<number, number>;
    execute: () => Promise<any>;
    refresh: () => Promise<any>;
    clear: () => void;
    abort: () => void;
};
declare const _useFetch: typeof useFetch & UseFetchStatic;
export { _useFetch as useFetch };
