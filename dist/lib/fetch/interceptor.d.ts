import { RequestInterceptorFn, ResponseInterceptorFn, ErrorInterceptorFn, InterceptorHandler } from './types';
export declare const createInterceptor: () => {
    interceptor: {
        request: {
            use(fn: RequestInterceptorFn): number;
            eject(id: number): void;
            push(fn: RequestInterceptorFn): number;
        };
        response: {
            use(fn: ResponseInterceptorFn): number;
            eject(id: number): void;
            push(fn: ResponseInterceptorFn): number;
        };
        error: {
            use(fn: ErrorInterceptorFn): number;
            eject(id: number): void;
            push(fn: ErrorInterceptorFn): number;
        };
    };
    requestInterceptors: InterceptorHandler<RequestInterceptorFn>[];
    responseInterceptors: InterceptorHandler<ResponseInterceptorFn>[];
    errorInterceptors: InterceptorHandler<ErrorInterceptorFn>[];
};
export declare const fetchInterceptor: {
    request: {
        use(fn: RequestInterceptorFn): number;
        eject(id: number): void;
        push(fn: RequestInterceptorFn): number;
    };
    response: {
        use(fn: ResponseInterceptorFn): number;
        eject(id: number): void;
        push(fn: ResponseInterceptorFn): number;
    };
    error: {
        use(fn: ErrorInterceptorFn): number;
        eject(id: number): void;
        push(fn: ErrorInterceptorFn): number;
    };
}, requestInterceptors: InterceptorHandler<RequestInterceptorFn>[], responseInterceptors: InterceptorHandler<ResponseInterceptorFn>[], errorInterceptors: InterceptorHandler<ErrorInterceptorFn>[];
