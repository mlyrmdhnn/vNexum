export interface PaginationConfig {
    /**
     * Css class for navigation button.
     * Example (Previous and Next)
     */
    navButton?: string;
    /**
     * Css class for number button(1,2,3).
     */
    numberButton?: string;
    /**
     * Is the button on current page.
     */
    active?: string;
}
export declare const resolvePaginationLabel: (label: string, active: boolean, config: PaginationConfig) => {
    label: string;
    className: string;
    isNav: boolean;
};
