import React from "react";
import Navigation from "../../components/Navigation";
import style from "../styles/VehicleDetailsPage.module.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "next/router";
import { Image } from "@chakra-ui/react";
import isBrowser from "utils/isBrowser";
import { NextSeo } from "next-seo";

import {
  performSearchAction,
  changeResultPageAction,
  setSearchValueAction,
  selectVehicleAction,
  runSearchAction,
  clearSearchAction,
  removeTag,
  addTag,
  likeAction,
  disLikeAction,
  selectReviews,
} from "../../redux/actions";
import {
  getSearchValue,
  getTotal,
  getCurrentPage,
  getTags,
  getSelectedTags,
} from "../../redux/selectors";
import Footer from "../../components/Footer";
import ImagesGallerySection from "../../components/ImagesGallerySection";
import VehicleInformationSection from "../../components/VehicleInformationSection";
import VehicleInformationIconBlock from "../../components/VehicleInformationIconBlock";
import SellerInfo from "../../components/SellerInfo";
import OptionsBlock from "../../components/OptionsBlock";
import SellerNotesBlock from "../../components/SellerNotesBlock";
import SearchArea from "../../components/SearchArea";
import FuelEconomyIcon from "../../public/assets/img/icons/VDP_02_Vehicle_Info_Fuel_Economy.png";
import CarFaxIcon from "../../public/assets/img/icons/carfax-certified-pre-owned-used-car-vehicle-ryan-gosling.jpg";
import Like from "../../public/assets/img/icons/VDP_01_Save_Toggle_Grey.png";
import LikeActive from "../../public/assets/img/icons/VDP_01_Save_Toggle.png";
import Dislike from "../../public/assets/img/icons/VDP_01_Ignore_Toggle_Grey.png";
import DislikeActive from "../../public/assets/img/icons/VDP_01_Ignore_Toggle.png";
import Header from "components/shared/Header";

class VehicleDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.runSearch = this.runSearch.bind(this);
    this.searchTermChange = this.searchTermChange.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.state = {
      reviews: [],
    };
  }

  toggleTag(tag) {
    this.props.addTag(tag);
  }
  runSearch(value) {
    const { router } = this.props;
    changeResultPageAction(1);
    this.props.runSearchAction({ value, page: 1, router });
  }

  removeTag(tag, isSelected) {
    this.props.removeTag({
      tag,
      isSelected,
    });
  }

  onLikeHandler = () => {
    this.props.likeAction(this.props.vehicleModel.id);
  };

  onDisLikeHandler = () => {
    this.props.disLikeAction(this.props.vehicleModel.id);
  };

  onChange = (page) => {
    const { router, searchValue, changeResultPageAction, runSearchAction } =
      this.props;
    changeResultPageAction(page);
    runSearchAction({ value: searchValue, page, router });
  };

  searchTermChange({ searchValue }) {
    if (!searchValue) {
      this.props.clearSearchAction();
    }
    this.props.setSearchValueAction(searchValue);
  }

  componentDidMount() {
    const router = this.props.router;

    console.log({ isBrowser: isBrowser() });
    if (router.isReady || isBrowser()) {
      console.log({ query: router.query });

      const id = router.query.id;
      this.props.selectVehicleAction(id);
    }

    // this.props.selectVehicleAction(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    const {
      searchValue,
      page,
      router,
      runSearchAction,
      selectedTags,
      vehicleModel,
      selectReviews,
    } = this.props;

    const prevVehicleId = prevProps.router?.query?.id;
    const currId = router.query.id;

    if (prevVehicleId === undefined) {
      this.props.selectVehicleAction(currId);
    }

    if (
      prevProps.searchValue &&
      prevProps.searchValue !== searchValue &&
      prevProps.selectedTags + "" !== selectedTags + ""
    ) {
      let get_lat = this.props.get_lat;
      let get_lon = this.props.get_lon;
      runSearchAction({
        value: searchValue,
        page,
        router,
        tags: selectedTags,
        get_lat,
        get_lon,
      });
    }
    if (prevProps.vehicleModel !== vehicleModel) {
      selectReviews(vehicleModel.dealer.chatMeterLocationId, "topReviews").then(
        (reviews) => this.setState({ reviews: reviews })
      );
    }
  }

  render() {
    let { vehicleModel, searchValue, tags, selectedTags, router, imageURLs } =
      this.props;

    console.log({ vehicleModel });
    const { conditionDescription, year, make, model, customText } =
      vehicleModel;

    const seoTitle = `${conditionDescription} ${year}
                    ${make} ${model}`;
    const seoDescription = `${customText}`;
    const { asPath } = router;
    return (
      <>
        <NextSeo
          title={seoTitle}
          description={seoDescription}
          canonical={`https://dev-autosweet.azurewebsites.net${asPath}`}
          openGraph={{
            type: "website",
            url: `https://dev-autosweet.azurewebsites.net${asPath}`,
            site_name: "Auto Sweet Autos",
            description: "Automotive Marketing Agency for Dealerships",
            images: [
              {
                url: imageURLs,
                width: 400,
                height: 300,
                alt: "AutoSweet Logo",
                type: "image/png",
              },
            ],
          }}
        />
        <Header />
        <main className={style.wrap}>
          <section className={style.results}>
            <header>
              <SearchArea
                onSearch={this.runSearch}
                searchValue={searchValue}
                onSearchChange={this.searchTermChange}
                onToggleTag={this.toggleTag}
                tags={tags}
                selectedTags={selectedTags}
                onRemoveTag={this.removeTag}
              />
              <div className={style.info_actions}>
                <div className={style.info_actions_info}>
                  <div>
                    {vehicleModel.conditionDescription} {vehicleModel.year}{" "}
                    {vehicleModel.make} {vehicleModel.model}
                  </div>
                  <div className={style.gray}>
                    {vehicleModel.mileage
                      ? vehicleModel.mileage.toLocaleString("en-us")
                      : "-"}{" "}
                    Miles
                  </div>
                </div>
                <div>
                  <picture onClick={this.onLikeHandler}>
                    <Image
                      src={vehicleModel.liked ? LikeActive.src : Like.src}
                      alt="Like"
                      className={style.likeActionIcon}
                    />
                  </picture>
                  <picture onClick={this.onDisLikeHandler}>
                    <Image
                      src={
                        vehicleModel.disliked ? DislikeActive.src : Dislike.src
                      }
                      alt="Dislike"
                      className={style.likeActionIcon}
                    />
                  </picture>
                </div>
              </div>
            </header>
            <ImagesGallerySection />
            <VehicleInformationSection />
            <VehicleInformationIconBlock />
            {!!Object.keys(vehicleModel.dealer).length && (
              <>
                <SellerInfo />
              </>
            )}
            <article className={style.fuelEconomy}>
              <picture>
                <Image
                  alt="Fuelicon"
                  src={FuelEconomyIcon.src}
                  className={style.infoBlock}
                />
              </picture>
              <p className={style.blockInfo}>
                Fuel Economy
                <br />
                <span className={style.gray}>
                  {vehicleModel.cityMPG} City / {vehicleModel.highwayMPG} HWY
                </span>
              </p>
            </article>
            <article className={style.carFax}>
              <picture>
                <Image
                  objectFit="contain"
                  width="160px"
                  alt="carFaxIcon"
                  src={CarFaxIcon.src}
                  className={style.carFaxIco}
                />
              </picture>
              <p>Get the CarFax vehicle router report</p>
            </article>
            <OptionsBlock />
            <SellerNotesBlock reviews={this.state.reviews} />
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    get_lat: state.lat,
    get_lon: state.lon,
    vehicleModel: state.selectedVehicleItem,
    total: getTotal(state),
    page: getCurrentPage(state),
    tags: getTags(state),
    selectedTags: getSelectedTags(state),
    searchValue: getSearchValue(state),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    performSearchAction,
    changeResultPageAction,
    selectVehicleAction,
    setSearchValueAction,
    runSearchAction,
    clearSearchAction,
    removeTag,
    addTag,
    likeAction,
    disLikeAction,
    selectReviews,
  })
)(VehicleDetailsPage);
