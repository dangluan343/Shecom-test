import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={250} >
      <Menu mode="inline" >
        <Menu.Item key="1">
          <Link href="/admin-dashboard">
            Admin Dashboar
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/orders">
            Orders
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
