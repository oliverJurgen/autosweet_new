import { Menu } from "antd";
// import {Link} from "react-router-dom";
import Link from "next/link";
import React from "react";

const MyVehiclesMenu = () => (
  <Menu>
    <Menu.Item key="1">
      <Link href="/my-vehicles/liked">My Liked Vehicles</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link href="/my-vehicles/disliked">My Disliked Vehicles</Link>
    </Menu.Item>
  </Menu>
);

export default MyVehiclesMenu;
