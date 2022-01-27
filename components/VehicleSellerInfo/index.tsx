import React from "react";
import { connect } from "react-redux";
import "react-image-gallery/styles/css/image-gallery.css";
import style from "../../old_pages/styles/VehicleDetailsPage.module.css";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
import DirectionIcon from "public/assets/img/icons/VDP_02_Seller_Info_Direction_icon.png";
import WebIcon from "public/assets/img/icons/VDP_02_Seller_Info_Website_icon.png";

type Props = {
  vehicleModel: any;
};

class VehicleSellerInfo extends React.Component<Props, any> {
  render() {
    const { vehicleModel } = this.props;

    const options: any = { weekday: "long" };
    let D = new Date(),
      day = D.getUTCDay();
    let dayText = new Intl.DateTimeFormat("en-US", options).format(day);
    let today = vehicleModel.dealer?.salesHours
      ? vehicleModel.dealer?.salesHours?.filter(
          (day: any) => day.day === dayText
        )[0]
      : [];

    return (
      <article className={style.sellerInfo}>
        <h2 className={style.sellerInf}>SELLER INFO:</h2>
        <a
          className={style.sellerWebsite}
          href={`${vehicleModel.dealer?.dealerWebsite}`}
          target="_blank"
          rel="noreferrer"
        >
          {vehicleModel.dealer?.dealerName}
        </a>
        <span />
        <section className={style.hours}>
          <div style={{ display: "flex" }}>
            <div className={style.clock} />
            <div>Hours of Operation:</div>
          </div>
          <div className={style.time}>
            <div>
              {vehicleModel.dealer?.salesHours && (
                <div className={style.dropdown}>
                  <div>{today && today.open + "-" + today.close}</div>
                  <div className={`${style.dropbtn} ${style.arrowDowm}`}></div>
                  <div className={style.weekHours}>
                    {vehicleModel.dealer?.salesHours.map((item: any) => (
                      <div className={style.weekday}>
                        <div> {item.day}</div>
                        <div>
                          {" "}
                          {item.open} - {item.close}{" "}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <p className={style.direction}>
          <picture>
            <Image
              alt="DirectionIcon"
              src={DirectionIcon.src}
              className={style.iconSmall}
            />
          </picture>
          <a href={`tel:${vehicleModel.dealer?.phoneNumber}`}>
            {vehicleModel.dealer?.phoneNumber?.slice(0, 3)}-
            {vehicleModel.dealer?.phoneNumber?.slice(3, 6)}-
            {vehicleModel.dealer?.phoneNumber?.slice(6)}
          </a>
        </p>
        {/* <div className={style.sendText}>
          <div className={style.direction_ico} />
          <a href={`tel:${vehicleModel.dealer?.phoneNumber}`}>
            {vehicleModel.dealer?.phoneNumber?.slice(0, 3)}-
            {vehicleModel.dealer?.phoneNumber?.slice(3, 6)}-
            {vehicleModel.dealer?.phoneNumber.slice(6)}
          </a>
        </div>
        <div className={style.sendText}>
          <div className={style.sendText_ico} />
          <a href={`sms:${vehicleModel.dealer?.phoneNumber}`}>Send a Text</a>
        </div>
        <div className={style.sendText}>
          <div className={style.dealerWebIco} />
          <a href={`${vehicleModel.dealer?.dealerWebsite}`}>
            View Dealer Website
          </a>
        </div> */}
        <p className={style.direction}>
          <picture>
            <Image
              alt="WebIcon"
              src={WebIcon.src}
              className={style.iconSmall}
            />
          </picture>
          <a
            href={`${vehicleModel.dealer?.dealerWebsite}`}
            target="_blank"
            rel="noreferrer"
          >
            View Dealer Website
          </a>
        </p>
        <section className={style.maps}>
          <iframe
            title="map"
            loading="lazy"
            allowFullScreen
            src={`
                            https://www.google.com/maps/embed/v1/place?key=AIzaSyAzOJJiZQpIOzY9dC6Te04pWRKGXUJHlwo
                            &q=${vehicleModel.dealer?.dealerStreet1} ${vehicleModel.dealer?.dealerCity} ${vehicleModel.dealer?.dealerState}
                        `}
          ></iframe>
        </section>
        <section className={style.mapsText}>
          <p className={style.adress}>
            {vehicleModel.dealer?.dealerStreet1}
            <br />
            {vehicleModel.dealer?.dealerCity},{" "}
            {vehicleModel.dealer?.dealerState}{" "}
            {vehicleModel.dealer?.dealerZipCode}
          </p>
          <p className={style.direction}>
            <picture>
              <Image
                alt="DirectionIcon"
                src={DirectionIcon.src}
                className={style.iconSmall}
              />
            </picture>
            Get Directions
          </p>
        </section>
        <footer>
          <Link href="/credit-form">
            <button className={`${style.btn} ${style.gbtn}`}>
              Get Pre-Qualified Now
            </button>
          </Link>
        </footer>
      </article>
    );
  }
}

export default VehicleSellerInfo;
