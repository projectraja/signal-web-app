import { Icons } from "../constant/Icons";
import { Button, Input, Select } from "antd";

interface ISubHeaderProps {
    title?: string
    subTitle?: string
    count?: number
    addBtn?: boolean
    addBtnText?: string
    onAddClick?: any
    dropdown?: boolean
    dropdownText?: string
    dropdownValue?: any
    dropdownKey?: any
    dropdownLabel?: any
    dropdownList?: any[]
    onChangeDropdown?: any
    onClickDropdown?: any
    search?: boolean
    filterBtn?: boolean
    onChangeSearch?: any
    onSubmitSearch?: any
    searchStr?: string
    isLoading?: boolean
}

const SubHeader: React.FC<ISubHeaderProps> = (props) => {
    const { title, subTitle, count, addBtn, addBtnText, dropdown, dropdownText, search, filterBtn, searchStr, isLoading,
        dropdownKey, dropdownLabel } = props;
    const { Option } = Select;

    return <div className="row align-items-center mb-2" style={{ height: subTitle ? '3.5rem' : '2.5rem', justifyContent: 'space-between' }}>
        <div className="col-3 d-flex">
            {title &&
                <div className="col" style={{ fontWeight: '600', fontSize: '18px' }}>
                    <span style={{ color: '#000000' }}>{title}</span>
                </div>
            }
        </div>
        <div className="col-9 d-flex justify-content-end">
            {(dropdown && props.dropdownList && props.dropdownList?.length > 0) &&
                <div className="px-1 w-50 text-end">
                    <Select
                        placeholder={dropdownText} className="custom-sub-header-select"
                        // optionFilterProp="children" style={{ width: '100%' }}
                        // filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                        // filterSort={(optionA, optionB) =>
                        //     (optionA!.children as unknown as string)
                        //         .toLowerCase()
                        //         .localeCompare((optionB!.children as unknown as string).toLowerCase())
                        // }
                        defaultValue={props?.dropdownValue} onChange={(value) => props.onChangeDropdown(value)}
                        // onClick={() => props?.onClickDropdown()}
                    >
                        {props?.dropdownList?.map((dropdown: any, index: any) => {
                            return <Option key={index} value={dropdown[dropdownKey]}>{dropdown[dropdownLabel]}</Option>
                        })}
                    </Select>
                </div>
            }
            {search &&
                <div className="px-1">
                    <Input.Search placeholder="Search here" enterButton className="custom-sub-header-search"
                        value={searchStr} allowClear loading={isLoading ? true : false}
                        onChange={props?.onChangeSearch} onSearch={props?.onSubmitSearch} />
                </div>
            }
            {addBtn &&
                <div className="px-1">
                    <Button htmlType='submit' className="custom-btn"
                        style={{ fontWeight: 'normal !important' }} type='primary' block
                        onClick={props?.onAddClick}>{addBtnText}</Button>
                </div>
            }
            {filterBtn &&
                <div className="px-1">
                    <img src={Icons.Funnel} alt='funnel' style={{ width: '2.1rem', cursor: 'pointer' }} />
                </div>
            }
        </div>
        {subTitle &&
            <div style={{ color: '#635D5D', fontSize: '12.5px' }}>{subTitle}</div>
        }
    </div>
}

export default SubHeader;
