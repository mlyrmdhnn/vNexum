export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    mode: 'dark' | 'light';
}
export declare const toastState: {
    toasts: {
        id: number;
        message: string;
        type: "success" | "error" | "info" | "warning";
        mode: "dark" | "light";
    }[];
};
export declare const toast: {
    add(message: string, type?: "success" | "error" | "warning" | "info", mode?: "dark" | "light"): void;
    remove(id: number): void;
    success(msg: string, mode?: "dark" | "light"): void;
    error(msg: string, mode?: "dark" | "light"): void;
    info(msg: string, mode?: "dark" | "light"): void;
    warning(msg: string, mode?: "dark" | "light"): void;
};
