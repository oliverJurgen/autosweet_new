import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import style from "../../old_pages/styles/VehicleDetailsPage.module.css";
import { connect } from "react-redux";
import { Rate } from "antd";
import { getAnchor } from "../../redux/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import GoogleIcon from "public/assets/img/icons/google.png";
import FacebookIcon from "public/assets/img/icons/facebook.png";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { Row, Col } from "antd";
import Image from "next/image";

class SellerNotes extends React.Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.scrollAnchor) {
      this.scrollRef.current.scrollIntoView();
    }
  }

  render() {
    let { vehicleModel, reviews } = this.props;
    return (
      <Row className={style.notes} gutter={[0, 8]}>
        <Col xs={24} md={12}>
          <article className={style.sellerNotes}>
            <h4 className={`${style.fw600} ${style.ml10}`}>Seller Notes:</h4>
            <p className={`${style.customText} ${style.gray}`}>
              {vehicleModel.customText}
            </p>
          </article>
        </Col>
        <Col xs={24} md={12}>
          <article
            className={style.dealerRev}
            id="dealerReview"
            ref={this.scrollRef}
          >
            <div className={style.ratingRow}>
              <div className={`${style.fw600} ${style.ml10}`}>
                Dealer Reviews:
              </div>
              <div className={style.reviews}>
                <div>
                  <Image
                    className={style.icon}
                    src={GoogleIcon}
                    alt="googleicon"
                  />
                  <FontAwesomeIcon icon={faStar} className={style.faStar} />
                  {vehicleModel.dealer.googleScore
                    ? vehicleModel.dealer.googleScore
                    : "-"}
                </div>
                <div>
                  <Image className={style.icon} src={FacebookIcon} alt="icon" />
                  {vehicleModel.dealer.numberOfFacebookReviews
                    ? vehicleModel.dealer.numberOfFacebookReviews
                    : "-"}
                </div>
              </div>
              {reviews.length > 0 && (
                <Link href={`/dealer-reviews/${vehicleModel.id}`}>
                  <button className={`${style.btn} ${style.gbtn}`}>
                    More dealer reviews
                  </button>
                </Link>
              )}
            </div>
            {reviews.length > 0 ? (
              reviews.map((item, index) => (
                <div key={index} className={style.review}>
                  <div className={style.avatar}>
                    <Image alt="avatar" src={item.reviewerPictureURL} />
                  </div>
                  <div>
                    <div className={style.name}>{item.reviewerUserName}</div>
                    <div className={style.rating}>
                      <Rate disabled value={item.rating} />{" "}
                      <div className={style.date}>
                        {new Intl.DateTimeFormat("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(item.reviewDate))}
                      </div>
                    </div>
                    <div className={style.reviewText}>{item.reviewDetail}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={style.noReviews}>
                There are no reviews for this dealer
              </div>
            )}
          </article>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vehicleModel: state.selectedVehicleItem,
    scrollAnchor: getAnchor(state),
  };
};

export default connect(mapStateToProps)(SellerNotes);
