import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import {NavLink} from "react-router-dom";
import Link from "next/link";
import { withRouter } from "next/router";
import { Pagination } from "antd";
import CarInfo from "../../components/CarInfo";
import Footer from "../../components/Footer";
import FullPageLoader from "../../components/Preloader/Preloader";
import Navigation from "../../components/Navigation";
import {
  getLikedVehiclesAction,
  getDislikedVehiclesAction,
} from "../../redux/actions";
import { getCurrentPage, getTotal, getVehicles } from "../../redux/selectors";
import style from "../styles/LikeDislikeListing.module.css";

const pageSize = 8;

class LikeDislikeListing extends React.Component {
  onChange = (page) => {
    const { type } = this.props.router.query;
    if (type === "liked") {
      this.props.getLikedVehiclesAction(page, pageSize);
    } else {
      this.props.getDislikedVehiclesAction(page, pageSize);
    }
    // ** refactor
    window.scrollTo(0, 0);
  };

  componentDidMount() {
    const { type } = this.props.router.query;
    if (type === "liked") {
      this.props.getLikedVehiclesAction();
    } else {
      this.props.getDislikedVehiclesAction();
    }
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.router.query.type !== this?.props?.router?.query?.type) {
      if (this.props.router.query.type === "liked") {
        this.props.getLikedVehiclesAction();
        return;
      }
      if (this.props.router.query.type === "disliked") {
        this.props.getDislikedVehiclesAction();
      }
    }
  }

  render() {
    let { vehicleList, total, page } = this.props;

    return (
      <>
        <div className={style.LikeDislikeContainer}>
          <header className={style.Header}>
            {/* <Link className={style.logo} href="/" /> */}
            <Navigation />
          </header>
          <div className={style.LikeDislikeBody}>
            {vehicleList.length ? (
              <div className={style.resultList}>
                {vehicleList.map((data, index) => {
                  return <CarInfo key={`car_info_${index}`} {...data} />;
                })}
                <div className={style.pagination}>
                  <Pagination
                    current={page}
                    pageSize={pageSize}
                    onChange={this.onChange}
                    total={total}
                    responsive
                  />
                </div>
              </div>
            ) : (
              <div className="empty-results">No results</div>
            )}
          </div>
        </div>
        <Footer />
        <FullPageLoader />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vehicleList: getVehicles(state),
    total: getTotal(state),
    page: getCurrentPage(state),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getLikedVehiclesAction,
    getDislikedVehiclesAction,
  })
)(LikeDislikeListing);
