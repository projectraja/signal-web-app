import React from 'react';
import { Tabs } from 'antd';

interface ICustomTab {
  items: any[],
  children: any
  onSelectTab: any
}

const CustomTab: React.FC<ICustomTab> = (props) => {

  const onChange = (key: any) => {
    console.log(typeof key);
    props?.onSelectTab(key);
  };

  return <Tabs
    onChange={onChange}
    type="card"
    items={props?.items.map((item) => {
      return {
        label: item?.name,
        key: item?.id,
        children: props?.children,
      };
    })}
  />
};

export default CustomTab;