import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Row, Col, Input, Select } from "antd";
import Navigation from "../../components/Navigation";
import style from "../styles/FormPage.module.css";
// import { NavLink, withRouter } from 'react-router-dom';
import { withRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Logotype from "public/assets/img/icons/AutosweetAUTOS_Final-1png-03.png";
import { selectStatesAction, selectCitiesAction } from "../../redux/actions";
// import { welcomeEn, welcomeSp } from "../../public/assets/videos";
import welcomeEn from "public/assets/videos/welcomeEN.mp4";
import welcomeSp from "public/assets/videos/welcomeSP.mp4";
import {
  getCities,
  getSelectedVehicleItem,
  getStates,
} from "../../redux/selectors";
import {
  Poster,
  Poster2,
  Poster3,
  Poster4,
} from "../../public/assets/img/posters";
import http from "../../services/api";
class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      address: "",
      zip: "",
      cityId: null,
      stateId: null,
      homePhone: "",
      cellPhone: "",
      email: "",
      comments: "",
      agreeWithPolicies: true,
      autoSweetDealerId:
        this.props.selectedVehicleItem.dealer.autoSweetDealerID,
      posterId: Math.floor(Math.random() * 4),
    };
  }
  componentDidMount() {
    this.props.selectStatesAction();
    this.props.selectCitiesAction(1);
    // ** refactor
    let language = window.navigator.userLanguage || window.navigator.language;
    if (language.includes("es")) {
      this.setState({ spain: true });
    }
    if (!this.state.autoSweetDealerId) {
      this.setState({ autoSweetDealerId: 12 });
    }
  }
  componentDidUpdate(_prevProps, prevState) {
    if (prevState.stateId !== this.state.stateId) {
      this.props.selectCitiesAction(this.state.stateId);
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await http.post("/api/credit", {
        ...this.state,
        spain: undefined,
        posterId: undefined,
      });
      let language = this.state.spain ? "es" : "en";
      this.props.router.push("/thank-you/" + language);
    } catch (e) {
      console.log(e);
    }
  };
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChange = (e) => {
    if (e.target.value !== "0") {
      this.setState({ [e.target.name]: parseInt(e.target.value) });
    } else {
      this.setState({ [e.target.name]: null });
    }
  };
  render() {
    const posters = [Poster, Poster2, Poster3, Poster4];
    let { states, cities } = this.props;
    return (
      <>
        <header className={style.Header}>
          <Link href="/">
            <span className={style.logo} />
          </Link>
          <Navigation />
        </header>
        <main className={style.FormPage}>
          <Row
            className={style.content}
            justify="center"
            style={{ paddingBottom: "50px" }}
          >
            <Col span={12}>
              <Row>
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
                  src={this.state.spain ? welcomeSp : welcomeEn}
                  autoPlay
                ></video>
              </Row>
              <Row>
                <form onSubmit={this.handleSubmit}>
                  <fieldset className={style.fieldset}>
                    <legend>Personal Information</legend>
                    <Row>
                      <Col sm={24} md={4}>
                        Name
                      </Col>
                      <Col sm={24} md={20}>
                        <Row justify="space-between">
                          <Col sm={24} md={12}>
                            <div>
                              <input
                                className={style.inputForm}
                                maxLength="250"
                                name="firstName"
                                pattern="[A-Za-z]+"
                                required
                                type="text"
                                onChange={this.handleInput}
                                placeholder=" "
                                title="Should contain letters only."
                              />
                              <label className={style.label}>
                                First Name<span>*</span>
                              </label>
                            </div>
                          </Col>
                          <Col sm={24} md={11}>
                            <div>
                              <input
                                className={style.inputForm}
                                name="lastName"
                                pattern="[A-Za-z]+"
                                maxLength="250"
                                required
                                type="text"
                                onChange={this.handleInput}
                                placeholder=" "
                                title="Should contain letters only."
                              />
                              <label className={style.label}>
                                Last Name<span>*</span>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <Row justify="space-between">
                          <Col sm={24} md={12}>
                            <div>
                              <label className={style.label}>Middle Name</label>
                              <input
                                className={style.inputForm}
                                pattern="[A-Za-z]+"
                                title="Should contain letters only."
                                name="middleName"
                                maxLength="250"
                                type="text"
                                placeholder=" "
                                onChange={this.handleInput}
                              />
                            </div>
                          </Col>
                          <Col sm={24} md={11}>
                            <div>
                              <label className={style.label}>Suffix</label>
                              <input
                                className={style.inputForm}
                                maxLength="5"
                                name="suffix"
                                type="text"
                                placeholder=" "
                                onChange={this.handleInput}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset className={style.fieldset}>
                    <legend>Residential Form</legend>
                    <Row>
                      <Col sm={24} md={4}>
                        Address
                      </Col>
                      <Col sm={24} md={20}>
                        <Row>
                          <Col sm={24} md={24}>
                            <div>
                              <label className={style.label}>
                                Address<span>*</span>
                              </label>
                              <input
                                className={style.inputForm}
                                placeholder=" "
                                name="address"
                                required
                                type="text"
                                onChange={this.handleInput}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row justify="space-between">
                          <Col sm={24} md={8}>
                            <select
                              required
                              name="stateId"
                              id="states"
                              onChange={this.handleChange}
                              className={style.formSelect}
                            >
                              <option value="" hidden>
                                State*
                              </option>
                              {states.map((item) => {
                                return (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                          </Col>
                          <Col sm={24} md={7}>
                            <select
                              required
                              name="cityId"
                              id="cities"
                              onChange={this.handleChange}
                            >
                              <option value="" hidden>
                                City*
                              </option>
                              {cities.map((item) => {
                                return (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                          </Col>
                          <Col sm={24} md={8}>
                            <div>
                              <label className={style.label}>
                                ZIP<span>*</span>
                              </label>
                              <input
                                className={style.inputForm}
                                placeholder=" "
                                pattern="\d{5}"
                                minLength="5"
                                maxLength="5"
                                name="zip"
                                required
                                title="Should contain 5-digit number."
                                type="text"
                                onChange={this.handleInput}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={24} md={4}>
                        Phone Number
                      </Col>
                      <Col sm={24} md={20}>
                        <Row justify="space-between">
                          <Col sm={24} md={12}>
                            <div>
                              <label className={style.label}>
                                Cell Phone Number<span>*</span>
                              </label>
                              <input
                                pattern="\d{3}-\d{3}-\d{4}"
                                className={style.inputForm}
                                placeholder=" "
                                type="text"
                                name="cellPhone"
                                title="Format: xxx-xxx-xxxx"
                                required
                                onChange={this.handleInput}
                              />
                            </div>
                          </Col>
                          <Col sm={24} md={11}>
                            <div>
                              <input
                                placeholder="Home Phone Number"
                                pattern="\d{3}-\d{3}-\d{4}"
                                title="Format: xxx-xxx-xxxx"
                                type="text"
                                name="homePhone"
                                onChange={this.handleInput}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={24} md={4}>
                        Email
                      </Col>
                      <Col sm={24} md={10}>
                        <div>
                          <label className={style.label}>
                            Email<span>*</span>
                          </label>
                          <input
                            className={style.inputForm}
                            placeholder=" "
                            maxLength="250"
                            name="email"
                            required
                            type="email"
                            pattern="[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}"
                            onChange={this.handleInput}
                          />
                        </div>
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset className={style.fieldset}>
                    <Row>
                      <Col sm={24} md={4}>
                        Comment
                      </Col>
                      <Col sm={24} md={20}>
                        <textarea
                          name="comment"
                          maxLength="250"
                          placeholder="How did you hear about us?"
                          onChange={this.handleInput}
                        ></textarea>
                      </Col>
                    </Row>
                  </fieldset>
                  <p>
                    By clicking the I Agree checkbox and Submit, I consent to
                    have my credit file accessed for purposes of prequalifying
                    for a vehicle loan. This is a soft inquiry and will not
                    impact my credit score. I agree to the{" "}
                    <a href="/privacypolicy" target="_blank">
                      Privacy Notice
                    </a>
                    ,{" "}
                    <a href="/termsandconditions" target="_blank">
                      Terms and Conditions
                    </a>{" "}
                    and I acknowledge I may be contacted by 700 XML Test
                    Account. I understand that I might not prequalify depending
                    on the prequalification criteria.
                  </p>
                  <div className={style.terms}>
      <Image src={Logotype} alt="logotype" className={style.logo} />
                    <input type="checkbox" name="agree" required />
                    <label>
                      I have read and agree to the Terms and Conditions
                    </label>
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </Row>
            </Col>
            <Col span={5}>
              <Image src={posters[this.state.posterId]} alt="poster" />
            </Col>
          </Row>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    states: getStates(state),
    cities: getCities(state),
    selectedVehicleItem: getSelectedVehicleItem(state),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    selectStatesAction,
    selectCitiesAction,
  })
)(FormPage);
