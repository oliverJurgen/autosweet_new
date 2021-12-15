import {Menu} from "antd";
import {Link} from "react-router-dom";
import React from "react";

const MyVehiclesMenu = () => (
  <Menu>
    <Menu.Item key="1">
      <Link to={{pathname: '/my-vehicles/liked'}}>My Liked Vehicles</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to={{pathname: '/my-vehicles/disliked'}}>My Disliked Vehicles</Link>
    </Menu.Item>
  </Menu>
);

export default MyVehiclesMenu
