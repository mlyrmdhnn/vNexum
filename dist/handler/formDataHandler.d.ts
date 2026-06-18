/**
    Reactive object + file to FormData and auto-generate preview URL if needed.
 */
/**
 *
 * @param reactiveObj
 * @param fileName
 * @param fileValue
 * @param preview
 */
export declare function documentHandler(reactiveObj: Record<string, any>, fileName: string, fileValue: File | Blob | null, preview?: false): FormData;
export declare function documentHandler(reactiveObj: Record<string, any>, fileName: string, fileValue: File | Blob | null, preview: true): {
    formData: FormData;
    previewValue: string;
};
