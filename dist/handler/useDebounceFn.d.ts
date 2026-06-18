export declare function useDebounceFn<T extends (...args: any[]) => any>(fn: T, delay?: number): {
    (...args: Parameters<T>): void;
    cancel(): void;
};
