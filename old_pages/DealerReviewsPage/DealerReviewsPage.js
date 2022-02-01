import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import style from '../styles/DealerReviewsPage.module.css';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select, Checkbox, Pagination } from 'antd';
import Review from '../../components/Review';
import { selectReviews, selectVehicleAction } from '../../redux/actions';
import FullPageLoader from '../../components/Preloader/Preloader';
import {
  faStar,
  faDirections,
  faClock,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons';
import Header from 'components/shared/Header';
import GoogleIcon from '/public/assets/img/icons/google.png';
import FacebookIcon from '/public/assets/img/icons/facebook.png';

class DealerReviewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      checkboxValues: ['facebook', 'google'],
      page: 1,
      size: 0,
      type: 'recent',
    };
  }

  componentDidMount() {
    const { id } = this.props.router.query;
    if (id) {
      this.props.selectVehicleAction(id).then(() => {
        this.fetchReviews(1, this.state.checkboxValues);
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.router.query.id !== prevProps.router.query.id) {
      this.props
        .selectVehicleAction(this.props.router.query.id)
        .then(() =>
          this.fetchReviews(this.state.page, this.state.checkboxValues)
        );
    }
  }
  fetchReviews = (page, filter, value) => {
    if (filter.length > 1) {
      this.props
        .selectReviews(
          this.props.selectedVehicleItem.dealer.chatMeterLocationId,
          value ? value : 'recent',
          page
        )
        .then((data) => {
          console.log({ data });
          this.setState({
            reviews: data.reviews,
            size: data.numberOfReviews / 5,
            page: page ? page : 1,
          });
        });
    } else if (filter.length === 1) {
      this.props
        .selectReviews(
          this.props.selectedVehicleItem.dealer.chatMeterLocationId,
          value ? value : 'recent',
          page,
          filter[0]
        )
        .then((data) =>
          this.setState({
            reviews: data.reviews,
            size: data.numberOfReviews / 5,
            page: page ? page : 1,
          })
        );
    }
  };

  handleChange = (value) => {
    this.fetchReviews(1, this.state.checkboxValues, value);
    this.setState({ type: value });
  };
  checkboxHandler = (e) => {
    if (e.length !== 0) {
      this.fetchReviews(1, e, this.state.type);
      this.setState({ checkboxValues: e });
    }
  };
  paginationHandler = (e) => {
    this.setState({ page: e });
    this.fetchReviews(e, this.state.checkboxValues, this.state.type);
  };
  selectData = [
    { name: 'Most Recent', value: 'recent' },
    { name: 'Best Reviews', value: 'best' },
    { name: 'Worst Reviews', value: 'worst' },
  ];
  checkboxOptions = [
    { label: 'Google', value: 'google' },
    { label: 'Facebook', value: 'facebook' },
  ];
  paginationButtons = (_current, type, originalElement) => {
    if (type === 'prev') {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className={style.paginationButtons}>Prev</a>
      );
    }
    if (type === 'next') {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className={style.paginationButtons}>Next</a>
      );
    }
    return originalElement;
  };
  render() {
    const { selectedVehicleItem } = this.props;
    return (
      <>
        <Header />
        <Row className={style.content} justify="center">
          <Col span={16}>
            <Row>
              <Col className={style.dealerName} md={9}>
                <div className={`${style.bold} ${style.dealerTitle}`}>
                  {selectedVehicleItem.dealer.dealerName}
                </div>
                <h6 className={style.bold}>Seller Information:</h6>
              </Col>
              <Col md={10}>
                <div className={style.reviews}>
                  <div>
                    <img
                      className={style.social_icons}
                      src={GoogleIcon.src}
                      alt="GoogleIcon"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className={`${style.faStar} ${style.icon}`}
                    />
                    <div>{selectedVehicleItem.dealer.googleScore}</div>
                  </div>
                  <div>
                    <img
                      className={style.social_icons}
                      src={FacebookIcon.src}
                      alt="GoogleIcon"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className={`${style.faStar} ${style.icon}`}
                    />
                    <div>{selectedVehicleItem.dealer.facebookScore}</div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row justify="space-between" align="stretch">
              <Col className={style.dealerInfo} lg={8} md={24} sm={24} xs={24}>
                <div className={style.time}>
                  <div>
                    <FontAwesomeIcon icon={faClock} className={style.icon} />
                  </div>
                  <div>
                    {selectedVehicleItem &&
                      selectedVehicleItem.dealer?.salesHours?.map(
                        (item, index) => (
                          <div key={index} className={style.days}>
                            <div className={style.Day}>{item.day}</div>
                            <div>
                              {item.open}-{item.close}
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
                <div className={style.direction}>
                  <FontAwesomeIcon icon={faDirections} className={style.icon} />
                  <a
                    className={style.link}
                    href={`tel:${selectedVehicleItem.dealer?.phoneNumber}`}
                  >
                    {selectedVehicleItem.dealer?.phoneNumber?.slice(0, 3)}-
                    {selectedVehicleItem.dealer?.phoneNumber?.slice(3, 6)}-
                    {selectedVehicleItem.dealer?.phoneNumber?.slice(6)}
                  </a>
                </div>
                <div className={style.direction}>
                  <FontAwesomeIcon icon={faDesktop} className={style.icon} />
                  {selectedVehicleItem.dealer?.dealerWebsite ? (
                    <a
                      href={selectedVehicleItem.dealer.dealerWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className={style.link}
                    >
                      View Dealer Website
                    </a>
                  ) : (
                    <div className={style.dealerWebSite}>
                      View Dealer Website
                    </div>
                  )}
                </div>
                <div className={style.mapsText}>
                  <div className={style.adress}>
                    {selectedVehicleItem.dealer?.dealerStreet1}
                    <br />
                    {selectedVehicleItem.dealer?.dealerCity},{' '}
                    {selectedVehicleItem.dealer?.dealerState}{' '}
                    {selectedVehicleItem.dealer?.dealerZipCode}
                  </div>
                  <div className={style.direction}>
                    <FontAwesomeIcon
                      icon={faDirections}
                      className={style.icon}
                    />
                    Get Directions
                  </div>
                </div>
                <div className={style.center}>
                  <Link href={`/credit-form/${selectedVehicleItem.id}`}>
                    <button className={`${style.btn} ${style.gbtn}`}>
                      Get Pre-Qualified Now
                    </button>
                  </Link>
                </div>
              </Col>
              <Col lg={15} xs={24} md={24}>
                <iframe
                  style={{ border: 0, width: '100%', height: '100%' }}
                  title="map"
                  loading="lazy"
                  allowFullScreen
                  src={`
                            https://www.google.com/maps/embed/v1/place?key=AIzaSyAzOJJiZQpIOzY9dC6Te04pWRKGXUJHlwo
                            &q=${selectedVehicleItem.dealer?.dealerStreet1} ${selectedVehicleItem.dealer?.dealerCity} ${selectedVehicleItem.dealer?.dealerState}
                        `}
                ></iframe>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={16}>
            <Row>
              <div className={style.filter}>
                <Select
                  size="large"
                  placeholder="Order By"
                  style={{ width: 150, marginRight: 10 }}
                  onChange={this.handleChange}
                  defaultValue="recent"
                >
                  {this.selectData.map((item, index) => (
                    <Select.Option value={item.value} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                <Checkbox.Group
                  options={this.checkboxOptions}
                  onChange={this.checkboxHandler}
                  value={this.state.checkboxValues}
                />
              </div>
            </Row>
            <Row justify="center">
              {this.state.reviews.length ? (
                this.state.reviews.map((item, index) => {
                  return (
                    <Review
                      border
                      avatar={
                        item.contentProvider === 'FACEBOOK'
                          ? null
                          : item.reviewerPictureURL
                      }
                      key={index}
                      stars={item.rating}
                      date={item.reviewDate}
                      userName={item.reviewerUserName}
                      body={item.reviewDetail}
                      title={item.reviewDetail?.split('. ', 1)[0]}
                    />
                  );
                })
              ) : (
                <FullPageLoader />
              )}
              <div className={style.pagination}>
                {this.state.size !== 0 && (
                  <Pagination
                    current={this.state.page}
                    defaultCurrent={1}
                    pageSize={1}
                    onChange={this.paginationHandler}
                    total={this.state.size}
                    showSizeChanger={false}
                    // itemRender={this.paginationButtons}
                    responsive
                  />
                )}
              </div>
            </Row>
          </Col>
        </Row>
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
    selectReviews,
    selectVehicleAction,
  })
)(DealerReviewsPage);
