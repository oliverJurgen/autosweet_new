import React from "react";
// import { Link } from 'react-router-dom';
import Link from "next/link";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import MyVehiclesMenu from "./Menu";

class Navigation extends React.Component {
  render() {
    return (
      <nav className="homeHeader">
        <ul>
          <li>
            <Dropdown overlay={MyVehiclesMenu}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                MY VEHICLES <DownOutlined />
              </a>
            </Dropdown>
          </li>
          <li>
            <Link href="/tradein-form">TRADE IN VALUE</Link>
          </li>
          <li>
            <Link href="/credit-form">GET PRE-QUALIFIED NOW</Link>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://ace.autosweet.com/Login.aspx?ReturnUrl=%2f"
            >
              DEALER LOGIN
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Navigation;
