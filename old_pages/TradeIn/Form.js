import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import { NavLink, withRouter } from 'react-router-dom';
import { withRouter } from "next/router";
import { selectVehicleAction } from "../../redux/actions";

import http from "../../services/api";

// import Navigation from "../../components/Navigation";
import { NextSeo } from "next-seo";
import style from "../styles/TradeIn.module.css";
import FormItem from "antd/lib/form/FormItem";
import Header from "components/shared/Header";
class TradeInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      report: null,
      ymmtSelected: {
        make: "",
        model: "",
        trim: "",
        year: "",
      },
      suggestionTrigger: false,
      ymmtText: null,
      ymmtSearch: [],
      submitData: {},
    };
  }

  onSubmit = (values) => {
    const data = {
      ...values,
      mileage: parseInt(values.mileage ? values.mileage : 0),
      dealerUrl:
        this.props.selectedVehicleItem.dealer.dealerWebsite ||
        "http://www.autosweet.com",
      zipCode: this.props.selectedVehicleItem.dealer.dealerZipCode || "43220",
      ...this.state.ymmtSelected,
    };
    try {
      http
        .post("api/TradeInValue/report", {
          ...this.state.ymmtSelected,
          ...values,
          mileage: parseInt(values.mileage),
          dealerUrl:
            this.props.selectedVehicleItem.dealer.dealerWebsite ||
            "http://www.autosweet.com",
          zipCode:
            this.props.selectedVehicleItem.dealer.dealerZipCode || "43220",
        })
        .then((item) => {
          this.setState({
            submitData: { ...data, vehicleId: item.data },
            modalShow: true,
          });
        });
    } catch (er) {
      console.log(er);
    }
  };

  onSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleInput = async (e) => {
    this.setState({ ymmtText: e.target.value });
    if (e.target.value.trim()) {
      const res = await http.get("api/TradeInValue/ymmt-search", {
        params: { ymmtKeywords: e.target.value.trim() },
      });
      this.setState({ ymmtSearch: res.data, suggestionTrigger: true });
    } else {
      this.setState({ ymmtSearch: [], ymmtSelected: [] });
    }
  };

  inputStyle = {
    borderRadius: "5px",
    borderColor: "#d514ed",
  };

  handleModelClick = (data) => {
    const text = `${data.make} ${data.model} ${data.trim}`;
    this.setState({
      ymmtSelected: data,
      ymmtText: text,
      suggestionTrigger: false,
    });
  };

  requiredField = (message) => {
    return { required: true, message: `Please enter your ${message}!` };
  };
  listData = [
    "Local Supply - what is the local market supply?",
    "Local Market Demand - how popular is your car?",
    "Estimated Value - what does the market say your car is worth?",
  ];
  render() {
    const title = !this.state.ymmtText ? "Please enter Make Model Trim" : "";
    const tradeInData = this.state.submitData;
    return (
      <>
        <NextSeo
          title="Vehicle Trade In"
          description="Get Your Vehicle's Trade Value with ease."
          canonical="https://dev-autosweet.azurewebsites.net/tradein"
        />
        <Header />
        <Row className={style.content} justify="center">
          <Col xs={24}>
            <div className={style.headerText}>
              <div>
                GET YOUR VEHICLE'S
                <br />
                TRADE IN VALUE WITH EASE
              </div>
            </div>
          </Col>
          <Col xs={24}>
            <Form
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                mileage: "",
              }}
              onFinish={this.onSubmit}
              onFinishFailed={this.onSubmitFailed}
            >
              <Row justify="center">
                <Col xs={24}>
                  <Row
                    justify="center"
                    style={{ backgroundColor: "#303030", padding: "10px 0" }}
                  >
                    <Col xs={24} md={12} className={style.headerInputBlock}>
                      <Input
                        type="text"
                        className={style.inputHeader}
                        placeholder={"Enter Make Model Trim"}
                        prefix={<SearchOutlined />}
                        onChange={this.handleInput}
                        value={this.state.ymmtText}
                      />
                      {this.state.suggestionTrigger && (
                        <div className={style.suggestions}>
                          <ul>
                            {this.state.ymmtSearch ? (
                              this.state.ymmtSearch.map((item, index) => (
                                <li
                                  key={index}
                                  onClick={() => this.handleModelClick(item)}
                                >{`${item.make} ${item.model} ${item.trim}`}</li>
                              ))
                            ) : (
                              <li>No items</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={12}>
                  <Row justify="center">
                    <div className={style.mv2}>
                      See below for a sample that similar cars in your market.
                      You can see:
                    </div>
                    <div className={style.list}>
                      <ul>
                        {this.listData.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={style.mv2}>
                      Please complete the information below for a real-time
                      market report for your Vehicles
                    </div>
                  </Row>
                  <Row gutter={[16]}>
                    <Col xs={24} md={12}>
                      <FormItem
                        name="firstName"
                        rules={[this.requiredField("First Name")]}
                      >
                        <Input
                          type="text"
                          placeholder="First Name"
                          className={style.input}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={24} md={12}>
                      <FormItem
                        name="lastName"
                        rules={[this.requiredField("Last Name")]}
                      >
                        <Input
                          type="text"
                          placeholder="Last Name"
                          className={style.input}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={24}>
                      <FormItem
                        name="email"
                        rules={[this.requiredField("Email")]}
                      >
                        <Input
                          type="email"
                          placeholder="Email Address"
                          className={style.input}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={12}>
                      <FormItem
                        name="phoneNumber"
                        rules={[this.requiredField("Phone Number")]}
                      >
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          className={style.input}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={12}>
                      <FormItem
                        name="mileage"
                        rules={[
                          {
                            type: "number",
                            min: 0,
                            message: "Only positive number!",
                          },
                        ]}
                      >
                        <InputNumber
                          placeholder="Mileage"
                          className={style.inputNumber}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={24}>
                      <Form.Item>
                        <Tooltip placement="top" title={title}>
                          <Button
                            htmlType="submit"
                            className={style.submit}
                            block
                          >
                            VALUE YOUR TRADE IN
                          </Button>
                        </Tooltip>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Modal
          title="Report"
          visible={this.state.modalShow}
          onCancel={() => this.setState({ modalShow: false })}
          footer={null}
          width="80vw"
        >
          <iframe
            scrolling="no"
            width="100%"
            className={style.iframe}
            title="report"
            src={`https://snap-api.tradepending.com/api/v4/report-html?zip_code=${tradeInData.zipCode}&url=${tradeInData.dealerUrl}&partner_id=6T6BbfEJXWzavkm86&vehicle_id=${tradeInData.vehicleId}`}
            frameBorder="0"
          />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedVehicleItem: state.selectedVehicleItem,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    selectVehicleAction,
  })
)(TradeInForm);
