import React from "react";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const Sidebar = ({changeTab, currentTab}) => {

  return (
    <Sider width={250} >
      <Menu mode="inline" defaultSelectedKeys={[currentTab]} onClick={(e) => {
        changeTab(e.key);
      }}>
        <Menu.Item key="dashboard">
            Admin Dashboard
        </Menu.Item>
        <Menu.Item key="orders">
            Orders
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
