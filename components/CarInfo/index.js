import React from "react";
import style from "./CarInfo.module.css";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { compose } from "redux";
import { selectVehicleAction, setAnchor } from "../../redux/actions";
import GoogleIcon from "public/assets/img/icons/google.png";
import FacebookIcon from "public/assets/img/icons/facebook.png";
import Link from "next/link";

class CarItem extends React.Component {
  constructor(props) {
    super(props);
    // this.vehicleDetails = this.vehicleDetails.bind(this);
  }

  formPage = () => {
    this.props.selectVehicleAction(this.props.id);
    this.props.router.push("/credit-form");
  };

  // vehicleDetails(anchor) {
  //   if (anchor) {
  //     this.props.setAnchor(true);
  //   } else {
  //     this.props.setAnchor(false);
  //   }
  //   const { dealer, vin, id, model, make, stockNumber, trim } = this.props;
  //   this.props.selectVehicleAction(id);
  //   this.props.router.push(`/vehicledetails/${id}`);
  //   this.props.router.push(
  //     `/vehicledetails/${id}/${vin}/${stockNumber}/${dealer.dealerCity}/${dealer.dealerState}/${make}/${model}/${trim}`
  //   );
  //   // ** refactor
  //   // window.scrollTo(0, 0);

  //   if (typeof window !== "undefined") {
  //     window.scrollTo(0, 0);
  //   }
  // }

  render() {
    let {
      // dealer,
      year,
      imageURLs,
      // make,
      // model,
      series,
      extColor,
      intColor,
      engineDescription,
      transmissionType,
      mileage,
      listingPriceMktPriceCompare,
      internetPrice,
      cityMPG,
      highwayMPG,
      listPrice,
      cost,
    } = this.props;
    const { dealer, vin, id, model, make, stockNumber, trim, router } =
      this.props;
    const vehicleModelUrl = `/vehicledetails/${id}?vin=${vin}&stockNum=${stockNumber}&dCity=${dealer.city}&dState=${dealer.state}&make=${make}&model=${model}&trim=${trim}`;

    const image = imageURLs && imageURLs.split("|")[0];

    let priceCompare =
      listingPriceMktPriceCompare > cost ? style.priceGreen : style.priceRed;
    if (listingPriceMktPriceCompare === cost) {
      priceCompare = style.priceNormal;
    }

    console.log({ router });

    return (
      <section className={style.ResultItem}>
        <Link
          onClick={() => {
            this.props.selectVehicleAction(id);
          }}
          href={vehicleModelUrl}
          passHref
        >
          <a>
            <figure className={style.itemImg}>
              <img src={image} alt="VehiclePhoto" />
            </figure>
          </a>
        </Link>
        <section className={style.itemInfo}>
          <span className={style.ad}>{dealer.dealerWebsite}</span>
          <Link
            href={vehicleModelUrl}
            // onClick={() => {
            //   this.props.selectVehicleAction(id);
            // }}
          >
            <a>
              <h3
              // onClick={() => this.vehicleDetails(false)}
              >
                {dealer.dealerName} | {year} {make} {model} {series}
              </h3>
            </a>
          </Link>
          <Link
            href={vehicleModelUrl}
            // onClick={() => {
            //   this.props.selectVehicleAction(id);
            // }}
          >
            <a>
              <p className={style.textDecoration}>
                Come see this {year} {make} today! - Exterior: {extColor}-
                Interior: {intColor}-<br />
                {engineDescription}- {transmissionType}-{cityMPG} MPG City -{" "}
                {highwayMPG} MPG <br />
                Highway - OVER ${internetPrice.toLocaleString("en-us")} is
                saving!
              </p>
            </a>
          </Link>
          <footer className={style.cardfooter}>
            <span style={{ fontWeight: "600" }}>
              {mileage ? mileage.toLocaleString("en-us") : "-"} Miles
            </span>
            <div className={style.price}>
              <span>
                $
                {(listPrice || internetPrice || cost || "-").toLocaleString(
                  "en-us"
                )}
              </span>
              <figure>
                <FontAwesomeIcon icon={faArrowAltCircleUp} />
              </figure>
            </div>
            <div className={style.google}>
              <Link href={vehicleModelUrl}>
                <a>
                  <figure onClick={() => this.vehicleDetails(true)}>
                    <img
                      className={style.social_icons}
                      src={GoogleIcon}
                      alt="GoogleIcon"
                    />
                  </figure>
                </a>
              </Link>
              <span>
                {dealer.googleScore} (
                {dealer.numberOfGoogleReviews
                  ? dealer.numberOfGoogleReviews
                  : "-"}
                )
              </span>
            </div>
            <div className={style.google}>
              <Link href={vehicleModelUrl}>
                <a>
                  <figure
                  // onClick={() => this.vehicleDetails(true)}
                  >
                    <img
                      className={style.social_icons}
                      src={FacebookIcon}
                      alt="GoogleIcon"
                    />
                  </figure>
                </a>
              </Link>
              <span>
                {dealer.facebookScore} (
                {dealer.numberOfFacebookReviews
                  ? dealer.numberOfFacebookReviews
                  : "-"}
                )
              </span>
            </div>
            <button className={style.formButton} onClick={this.formPage}>
              GET PRE-QUALIFIED NOW
            </button>
          </footer>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vehicleList: state.vehicleList,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { selectVehicleAction, setAnchor })
)(CarItem);
