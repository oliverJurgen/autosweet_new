import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import style from "../../old_pages/styles/VehicleDetailsPage.module.css";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Social from "./../Social/Social";
import { Form, Input, Button, Row, Col } from "antd";

type Props = {
  vehicleModel: any;
};

class VehicleInformation extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
      hidePlaceholder: "",
    };
  }

  onClickHandler = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (this.props.vehicleModel.dealer.vehicleURL) {
      // ** refactor
      window.open(this.props.vehicleModel.dealer.vehicleURL, "_blank");
    }
  };

  onFormSubmit = (values: any) => {
    console.log(values);
  };

  requiredField = (message: string) => {
    return { required: true, message: `Please enter your ${message}!` };
  };

  render() {
    const { vehicleModel } = this.props;
    const currentTime = new Date();
    const currentDayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(currentTime);
    const currentSchedule = vehicleModel.dealer.salesHours
      ? vehicleModel.dealer.salesHours.filter(
          (day: any) => day.day === currentDayName
        )[0]
      : null;
    let isOpened: number | boolean = false;
    if (currentSchedule) {
      const startDate =
        Number.parseInt(currentSchedule.open) +
        (currentSchedule.open.includes("PM") ? 12 : 0);
      const endDate =
        Number.parseInt(currentSchedule.close) +
        (currentSchedule.close.includes("PM") ? 12 : 0);
      isOpened =
        startDate &&
        endDate &&
        currentTime.getHours() > startDate &&
        currentTime.getHours() < endDate;
    }
    let priceCompare =
      vehicleModel.listingPriceMktPriceCompare > vehicleModel.cost
        ? style.priceGreen
        : style.priceRed;
    if (vehicleModel.listingPriceMktPriceCompare === vehicleModel.cost) {
      priceCompare = style.priceNormal;
    }
    return (
      <article className={style.price}>
        <header className={style.priceHeader}>
          <p>
            <span>$</span>
            <span>
              {(
                vehicleModel.listPrice ||
                vehicleModel.internetPrice ||
                vehicleModel.cost ||
                "-"
              ).toLocaleString("en-us")}
            </span>
          </p>
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </header>
        <p className={style.priceLink}>
          Click here to see how this price compares locally
        </p>
        <section className={style.priceSocial}>
          <Social
            facebookScore={vehicleModel.dealer.facebookScore}
            reviewsFacebook={vehicleModel.dealer.numberOfFacebookReviews}
            googleScore={vehicleModel.dealer.googleScore}
            reviewsGoogle={vehicleModel.dealer.numberOfGoogleReviews}
          />
        </section>
        <Link href="/credit-form">
          <button className={`${style.btn} ${style.gbtn}`}>
            Get Pre-Qualified Now
          </button>
        </Link>
        <section className={style.feedback}>
          <p style={{ marginBottom: "16px" }}>
            <span className={style.bold}>{vehicleModel.dealer.dealerName}</span>
            <br />
            <span className={style.feedbackWork}>
              {isOpened ? "OPEN NOW" : "CLOSED"}
            </span>
            <br />
            <span className={style.numberS}>
              {vehicleModel.dealer.phoneNumber?.slice(0, 3)}-
              {vehicleModel.dealer.phoneNumber?.slice(3, 6)}-
              {vehicleModel.dealer.phoneNumber?.slice(6)}
            </span>
            <br />
            {vehicleModel.dealer.vehicleURL ? (
              <a
                href={vehicleModel.dealer.vehicleURL}
                target="_blank"
                rel="noreferrer"
              >
                Visit {vehicleModel.dealer.dealerName}'s website to learn more
                about this vehicle.
              </a>
            ) : (
              <>
                Visit {vehicleModel.dealer.dealerName}'s website to learn more
                about this vehicle.
              </>
            )}
          </p>
          <Form onFinish={this.onFormSubmit}>
            <Row gutter={[8, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="firstName"
                  rules={[this.requiredField("First Name")]}
                  noStyle
                >
                  <Input
                    type="text"
                    placeholder="First Name"
                    className={style.input}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="lastName"
                  rules={[this.requiredField("Last Name")]}
                  noStyle
                >
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className={style.input}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="phone"
                  rules={[this.requiredField("Phone Number")]}
                  noStyle
                >
                  <Input
                    type="text"
                    pattern="\d{3}-\d{3}-\d{4}"
                    title="Format: xxx-xxx-xxxx"
                    placeholder="Phone Number"
                    className={style.input}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  rules={[this.requiredField("Email Address")]}
                  noStyle
                >
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className={style.input}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="comment" noStyle>
                  <Input.TextArea
                    placeholder="Comment"
                    className={style.input}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item noStyle>
                  <Button
                    htmlType="submit"
                    type="primary"
                    className={style.submitButton}
                    block
                  >
                    Send Email
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </section>
      </article>
    );
  }
}

export default VehicleInformation;
