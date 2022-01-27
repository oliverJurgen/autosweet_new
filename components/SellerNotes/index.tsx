import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import style from "../../old_pages/styles/VehicleDetailsPage.module.css";
import { useSelector } from "react-redux";
import { Rate } from "antd";
import { useQuery } from "react-query";
import { getAnchor } from "redux/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import GoogleIcon from "public/assets/img/icons/google.png";
import FacebookIcon from "public/assets/img/icons/facebook.png";
import Link from "next/link";
import { Row, Col } from "antd";
import { Image } from "@chakra-ui/react";
import client from "utils/client";
import CenterSpinner from "components/shared/CenterSpinner/CenterSpinner";

//   constructor(props) {
//     super(props);
//     this.scrollRef = React.createRef();
//   }

//   componentDidMount() {
//     if (this.props.scrollAnchor) {
//       this.scrollRef.current.scrollIntoView();
//     }
//   }

type Props = {
  vehicleModel: any;
};

const fetchReviews = (locationId: string, type: string) => async () => {
  const url = `/api/review/${type}`;

  try {
    const response = await client.get(url, {
      params: {
        locationId,
        //   page,
        //   filter,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const SellerNotes = (props: Props) => {
  const { vehicleModel } = props;
  const vehicleId = vehicleModel.id;
  const chatMeterLocationId = vehicleModel.dealer.chatMeterLocationId;

  const scrollAnchor = useSelector(getAnchor);
  const scrollRef = React.createRef();

  const { data, isLoading } = useQuery(
    [vehicleId],
    fetchReviews(chatMeterLocationId, "topReviews")
  );

  console.log({ data });
  const reviews = data;

  if (isLoading) return <CenterSpinner />;

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
          ref={scrollRef as any}
        >
          <div className={style.ratingRow}>
            <div className={`${style.fw600} ${style.ml10}`}>
              Dealer Reviews:
            </div>
            <div className={style.reviews}>
              <div>
                <Image
                  className={style.icon}
                  src={GoogleIcon.src}
                  alt="googleicon"
                />
                <FontAwesomeIcon icon={faStar} className={style.faStar} />
                {vehicleModel.dealer.googleScore
                  ? vehicleModel.dealer.googleScore
                  : "-"}
              </div>
              <div>
                <Image
                  className={style.icon}
                  src={FacebookIcon.src}
                  alt="icon"
                />
                {vehicleModel.dealer.numberOfFacebookReviews
                  ? vehicleModel.dealer.numberOfFacebookReviews
                  : "-"}
              </div>
            </div>
            {reviews.length > 0 && (
              <Link href={`/dealer-reviews/${vehicleModel.id}`} passHref>
                <a>
                  <button className={`${style.btn} ${style.gbtn}`}>
                    More dealer reviews
                  </button>
                </a>
              </Link>
            )}
          </div>
          {!!reviews.length ? (
            reviews.map((item: any, index: number) => (
              <div key={index} className={style.review}>
                <div>
                  {item.reviewerPictureURL ? (
                    <img
                      className={style.avatar}
                      src={item.reviewerPictureURL}
                      alt="avatar"
                    />
                  ) : (
                    <FontAwesomeIcon
                      className={style.avatar}
                      icon={faUser}
                      color="white"
                      style={{ padding: "5px" }}
                    />
                  )}
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
                  <p className={style.reviewText}>{item.reviewDetail}</p>
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
};

export default SellerNotes;

// const mapStateToProps = (state) => {
//   return {
//     vehicleModel: state.selectedVehicleItem,
//     scrollAnchor: getAnchor(state),
//   };
// };

// export default connect(mapStateToProps)(SellerNotes);
