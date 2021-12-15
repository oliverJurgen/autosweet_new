import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import GoogleIcon from "public/assets/img/icons/google.png";
import FacebookIcon from "public/assets/img/icons/facebook.png";
import MessageIcon from "public/assets/img/icons/VDP_02_Seller_Info_Text_icon.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Social extends React.Component {
  render() {
    const { facebookScore, reviewsFacebook, googleScore, reviewsGoogle } =
      this.props;
    return (
      <>
        <div>
          <a href="#dealerReview">
            <picture>
              <img alt="GoogleIcon" src={GoogleIcon} />
            </picture>
          </a>
          <figure>
            <FontAwesomeIcon icon={faStar} style={{ color: "orange" }} />
          </figure>
          <span>{googleScore}</span>
        </div>
        <div>
          <picture>
            <img alt="MessageIcon" src={MessageIcon} />
          </picture>
          <span>{reviewsGoogle ? reviewsGoogle : "-"}</span>
        </div>
        <div>
          <a href="#dealerReview">
            <picture>
              <img alt="FacebookIcon" src={FacebookIcon} />
            </picture>
          </a>
          <figure>
            <FontAwesomeIcon icon={faStar} style={{ color: "orange" }} />
          </figure>
          <span>{facebookScore}</span>
        </div>
        <div>
          <picture>
            <img alt="MessageIcon" src={MessageIcon} />
          </picture>
          <span>{reviewsGoogle ? reviewsGoogle : "-"}</span>
        </div>
      </>
    );
  }
}
export default Social;
