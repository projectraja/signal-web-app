export interface ITableColumn {
    key: string;
    idKey?: string;
    title: string;
    width?: string;
    render?: any;
    align?: string;
    type?: string;
    isTrim?: boolean;
    isLink?: boolean
}