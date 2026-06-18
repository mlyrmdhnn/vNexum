import { FetchConfigInstance } from './config';
import { InterceptorHandler, RequestInterceptorFn, ResponseInterceptorFn, ErrorInterceptorFn } from './types';
interface FetchCoreParams {
    endpoint: string;
    options: any;
    controller: AbortController;
    instanceConfig?: FetchConfigInstance;
    instanceRequestInterceptors?: InterceptorHandler<RequestInterceptorFn>[];
    instanceResponseInterceptors?: InterceptorHandler<ResponseInterceptorFn>[];
    instanceErrorInterceptors?: InterceptorHandler<ErrorInterceptorFn>[];
}
export declare const fetchCore: ({ endpoint, options, controller, instanceConfig, instanceRequestInterceptors, instanceResponseInterceptors, instanceErrorInterceptors, }: FetchCoreParams) => Promise<any>;
export {};
