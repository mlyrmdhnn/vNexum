/**
 * Interface Props.
 */
interface Props {
    cols: any[];
    title?: string;
    cssClass?: {
        divCss?: string;
        titleCss?: string;
        headerCss?: string;
        tableWrapperCss?: string;
        tableCss?: string;
        theadCss?: string;
        tbodyCss?: string;
        thCss?: string;
        trCss?: string;
        tdCss?: string;
        searchCss?: string;
        navCss?: string;
        navButton?: string;
        activeButton?: string;
        tdCssLoading?: string;
        navCssButtonLoading?: string;
        notFoundCss?: string;
    };
    showSearch?: boolean;
    searchPlaceholder?: string;
    showActions?: boolean;
    pick?: string;
    endpoint: string;
    notFoundText?: string;
}
type __VLS_Props = Props;
type __VLS_ModelProps = {
    modelValue?: string;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_1: {}, __VLS_3: {}, __VLS_6: any, __VLS_7: {
    row: any;
}, __VLS_9: {
    row: any;
}, __VLS_11: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_6>]?: (props: typeof __VLS_7) => any;
} & {
    component?: (props: typeof __VLS_1) => any;
} & {
    thead?: (props: typeof __VLS_3) => any;
} & {
    actions?: (props: typeof __VLS_9) => any;
} & {
    thead?: (props: typeof __VLS_11) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string | undefined) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
}>, {
    endpoint: string;
    cols: any[];
    title: string;
    cssClass: {
        divCss?: string;
        titleCss?: string;
        headerCss?: string;
        tableWrapperCss?: string;
        tableCss?: string;
        theadCss?: string;
        tbodyCss?: string;
        thCss?: string;
        trCss?: string;
        tdCss?: string;
        searchCss?: string;
        navCss?: string;
        navButton?: string;
        activeButton?: string;
        tdCssLoading?: string;
        navCssButtonLoading?: string;
        notFoundCss?: string;
    };
    showSearch: boolean;
    searchPlaceholder: string;
    showActions: boolean;
    notFoundText: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
