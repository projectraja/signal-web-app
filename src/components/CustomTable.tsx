import { Pagination, Tooltip } from "antd"
import { Images } from "../constant/Images"
import FunctionUtil from "../utils/Function-Util"

interface ICustomTableProps {
    columns: any[]
    datas: any[]
    defaultPaginationCurrent?: number
    paginationCurrent?: number
    paginationTotal?: number
    onPageChange?: any
    isLoading: boolean
}

interface ITableHeaderProps {
    columns: any[]
}

interface ITableRowProps {
    columns: any[]
    datas: any[]
}

interface ITableRowCellProps {
    sNo: number
    item: any
    column: any
}

const TableHeader: React.FC<ITableHeaderProps> = (props) => {
    const { columns } = props;

    return <div className='custom-table-header px-2'>
        {columns.map((column: any, columnIndex: any) => (
            <div key={columnIndex} className='custom-table-header-cell px-1' style={{ width: column.width, textAlign: column?.align }}>
                {column.title}
            </div>
        ))}
    </div>
}

const TableRowCell: React.FC<ITableRowCellProps> = (props) => {
    const { sNo, item, column } = props;
    let viewCell: any = null;

    if (column?.key === '') {
        viewCell = sNo;
    } else if (column?.render) {
        viewCell = column?.render(item[column?.key], item[column?.idKey]);
    } else {
        if (column?.type === 'Amount' && !item?.isPercentage) {
            viewCell = FunctionUtil.formatValue(item[column?.key]);
        } else {
            viewCell = item[column?.key];
        }

        if (!column?.render && column?.isTrim) {
            viewCell = <Tooltip placement='leftTop' title={viewCell} arrowPointAtCenter>
                {viewCell}
            </Tooltip>;
        } else if (!column?.render && column?.isLink) {
            viewCell = <Tooltip placement='leftTop' title='Go to page' arrowPointAtCenter>
                <div role='button' className="p-0 custom-link-btn text-ellipsis"
                    onClick={() => FunctionUtil.openURL(item[column?.key])}>{item[column?.key]}</div>
            </Tooltip>
        }
    }

    return <div className='custom-table-row-cell text-ellipsis px-1' style={{ width: column?.width, textAlign: column?.align }}>
        {viewCell}
    </div>
}

const TableRow: React.FC<ITableRowProps> = (props) => {
    const { columns, datas } = props;

    return <>
        {datas.map((item: any, itemIndex: any) => (
            <div key={itemIndex} className='custom-table-row p-2'>
                {columns.map((column: any, columnIndex: any) => (
                    <TableRowCell
                        key={columnIndex}
                        sNo={itemIndex + 1}
                        item={item}
                        column={column}
                    />
                ))}
            </div>
        ))}
    </>
}

const CustomTable: React.FC<ICustomTableProps> = (props) => {
    const { columns, datas, defaultPaginationCurrent, paginationCurrent, paginationTotal, onPageChange, isLoading } = props;
    let tableView = null;

    if (datas?.length > 0) {
        tableView = <div>
            <TableHeader columns={columns} />
            <div style={{ height: 'calc(100vh - 242px)', overflowY: 'auto' }}>
                <TableRow datas={datas} columns={columns} />
            </div>
            {(paginationCurrent || paginationCurrent === 0) &&
                <div className='my-2 d-flex justify-content-end'>
                    <Pagination size="small" total={paginationTotal}
                        current={paginationCurrent + 1} defaultCurrent={defaultPaginationCurrent}
                        onChange={onPageChange} />
                </div>
            }
        </div>
    } else if (!isLoading) {
        tableView = <div className="text-center mt-5" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            <img src={Images.NoData} alt="no-data-image" style={{ height: '11.5rem' }} />
        </div>
    }

    return <div className='custom-table'>{tableView}</div>
}

export default CustomTable;
