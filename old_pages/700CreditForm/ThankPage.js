import React, { Component } from "react";
import { Row, Col, Select, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import style from "../styles/FormPage.module.css";
import { thankEn, thankSp } from "../../assets/videos";
import Navigation from "../../components/Navigation";
import { NavLink, withRouter } from "react-router-dom";
import { getSelectedVehicleItem } from "../../redux/selectors";
import { compose } from "redux";
import { connect } from "react-redux";

class ThankPage extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.state = {
      spain: false,
    };
  }
  componentDidMount() {
    if (this.props.match.params.language === "spanish") {
      this.setState({ spain: true });
    }
  }
  handleBack() {
    this.props.history.go(-2);
  }
  render() {
    let { selectedVehicleItem } = this.props;
    const dealer = selectedVehicleItem.dealer;
    return (
      <div className={style.FormPage}>
        <header className={style.Header}>
          <NavLink className={style.logo} to="/"></NavLink>
          <Navigation />
        </header>
        <Row justify="center" className={style.content}>
          <Col span={12}>
            <Input.Group compact>
              <Select
                value={this.state.spain ? "Spain" : "English"}
                onChange={() => {
                  this.setState({ spain: !this.state.spain });
                }}
              >
                <Select.Option value="English">English</Select.Option>
                <Select.Option value="Spain">Spanish</Select.Option>
              </Select>
            </Input.Group>
            <video
              controls
              className={style.video}
              src={this.state.spain ? thankSp : thankEn}
              autoPlay
            ></video>
            <div className={style.thankYou}>
              <div>
                <h1>Thank You</h1>
                <p>
                  Someone from our dealership will contact you shortly.{" "}
                  {dealer.autoSweetDealerID}, {dealer.dealerName},{" "}
                  {dealer.phoneNumber}.
                </p>
              </div>
              <Button type="primary" onClick={this.handleBack}>
                <ArrowLeftOutlined />
                Back
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedVehicleItem: getSelectedVehicleItem(state),
  };
};

export default compose(withRouter, connect(mapStateToProps))(ThankPage);
