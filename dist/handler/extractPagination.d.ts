import { PaginationOptions } from '../lib/fetch/types';
declare const extractPagination: (result: any, config: PaginationOptions, pick?: string) => {
    data: any;
    from: any;
    to: any;
    total: any;
    links: any;
    current_page: any;
};
export default extractPagination;
