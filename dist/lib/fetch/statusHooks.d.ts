type StatusHookFn = (error: any) => void | Promise<void>;
export declare const registerStatusHook: (status: number, fn: StatusHookFn) => void;
export declare const runStatusHooks: (status: number, error: any) => Promise<void>;
export {};
