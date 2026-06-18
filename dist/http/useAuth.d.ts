import { HttpOptions } from '../lib/fetch/types';
interface HttpAuthOptions extends HttpOptions {
    csrf?: boolean;
    csrfUrl?: string;
    csrfBaseUrl?: string;
}
declare const useAuth: {
    (): void;
    redirectIfUnauthenticated(url?: string): void;
    setAuthStatus(status: boolean | null): void;
    login(url: string, options?: HttpAuthOptions): {
        data: import('vue').Ref<unknown, unknown>;
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
    checkAuth(url: string, options?: HttpAuthOptions): Promise<{
        isAuthenticated: any;
        path: string | null;
    }>;
};
export default useAuth;
