import { IOrder } from 'exports/types';
import React, { useEffect } from 'react';

import { Select } from 'antd';


import { Divider } from "antd";

import { IdcardOutlined, UpCircleOutlined, DownCircleOutlined, CheckCircleOutlined} from "@ant-design/icons";
import { COORDS_LIST } from 'exports/const.main';

const { Option } = Select;

interface Props {
    order: IOrder;
    selected?: boolean;
    onSelect?: (order: IOrder, startRow: number[], endRow: number[]) => void
}



const Order:React.FunctionComponent<Props> = ({order, selected, onSelect}) => {
    const [startRow, setStartRow] = React.useState(0);
    const [endRow, setEndRow] = React.useState(COORDS_LIST.length - 1);


    useEffect(() => {
        onSelect && onSelect(order, COORDS_LIST[startRow], COORDS_LIST[endRow]);
    }, [startRow, endRow]);

    return (
        <div className='bg-slate-200 select-none px-5 py-2 mb-4 whitespace-nowrap rounded-lg min-w-max min-w hover:bg-slate-300 transition' onClick={() => {
            !selected && onSelect(order, COORDS_LIST[startRow], COORDS_LIST[endRow]);
        }}>
            <div className="flex justify-between items-center">
                <span className='text-blue-900 text-base font-normal opacity-80 '>Order ID: #{order.id}</span>
                {selected && <CheckCircleOutlined className='text-base text-green-700'/>}
            </div>
            <Divider className='bg-slate-400 my-2'/>

            <div className='flex items-center text-blue-900 font-semibold'><IdcardOutlined style={{fontSize: '20px'}} /><span className='ml-3'>{order.first_name} {order.last_name}</span></div>
            <Divider className='bg-slate-400 my-2'/>


            <div className="flex flex-row items-center justify-between">
                <span className='text-blue-900 text-md font-bold opacity-80 flex items-center'>
                    <UpCircleOutlined style={{fontSize: '20px'}} className=" text-green-600"/>:
                    <Select defaultValue={0} onChange={setStartRow}>
                        {COORDS_LIST.map((item, id) => 
                            <Option key={id} value={id} label={'start_label_'+id}>Точка загрузки №{id + 1}</Option>    
                        )}
                    </Select>
                </span>
                
                <span className='text-blue-900 text-md font-bold opacity-80 flex items-center'>
                    <DownCircleOutlined style={{fontSize: '20px'}} className=" text-red-600"/>:
                    <Select defaultValue={COORDS_LIST.length - 1} onChange={setEndRow}>
                        {COORDS_LIST.map((item, id) => 
                            <Option key={id} value={id} label={'end_label_'+id}>Точка разгрузки №{id + 1}</Option>    
                        )}
                    </Select>
                </span>
            </div>
            
        </div>
    )
}

export default React.memo(Order)