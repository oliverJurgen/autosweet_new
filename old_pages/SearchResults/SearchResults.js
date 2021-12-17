import React from "react";
import CarInfo from "../../components/CarInfo";
import Navigation from "../../components/Navigation";
import SearchArea from "../../components/SearchArea";
import style from "../styles/SearchResults.module.css";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getVehicles,
  getSearchValue,
  getTotal,
  getCurrentPage,
  getTags,
  getSelectedTags,
} from "../../redux/selectors";
// import { NavLink, withRouter } from 'react-router-dom';
import { withRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  performSearchAction,
  changeResultPageAction,
  setSearchValueAction,
  addTag,
  runSearchAction,
  clearSearchAction,
  removeTag,
  setLat,
  setLon,
  validateTags,
  setAnchor,
} from "../../redux/actions";
import Footer from "../../components/Footer";
import { Pagination } from "antd";
import FullPageLoader from "../../components/Preloader/Preloader";
import Logo from "../../assets/img/icons/AutosweetAUTOS_Final-1png-03.png";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.runSearch = this.runSearch.bind(this);
    this.searchTermChange = this.searchTermChange.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  toggleTag(tag) {
    this.props.addTag(tag);
  }
  runSearch(value) {
    const { router, get_lat, get_lon, selectedTags } = this.props;
    changeResultPageAction(1);
    let tags = selectedTags;
    this.props.runSearchAction({
      value,
      page: 1,
      router,
      tags,
      get_lat,
      get_lon,
    });
  }

  removeTag(tag, isSelected) {
    this.props.removeTag({
      tag,
      isSelected,
    });
  }

  onChange = (page) => {
    const {
      router,
      searchValue,
      changeResultPageAction,
      runSearchAction,
      selectedTags,
      get_lat,
      get_lon,
    } = this.props;
    changeResultPageAction(page);
    let tags = selectedTags;
    runSearchAction({
      value: searchValue,
      page,
      router,
      tags,
      get_lat,
      get_lon,
    });
    window.scrollTo(0, 0);
  };

  searchTermChange({ searchValue }) {
    if (!searchValue) {
      this.props.clearSearchAction();
    }
    this.props.setSearchValueAction(searchValue);
  }

  componentDidMount() {
    const {
      location,
      router,
      performSearchAction,
      setLat,
      setLon,
      selectedTags,
    } = this.props;
    const params = new URLSearchParams(location.search);
    const value = params.get("q") || "";
    const page = params.get("page") || 1;

    let get_lat = this.props.get_lat;
    let get_lon = this.props.get_lon;
    let tags = selectedTags;
    if (!this.props.get_lat) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          if (position.coords.latitude) {
            const lat = position.coords.latitude.toString().slice(0, 11);
            const lon = position.coords.longitude.toString().slice(0, 11);
            setLat(lat);
            setLon(lon);
            performSearchAction({
              value,
              page,
              router,
              tags,
              get_lat: lat,
              get_lon: lon,
            });
          }
        });
      }
    } else {
      performSearchAction({ value, page, router, tags, get_lat, get_lon });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      searchValue,
      page,
      router,
      runSearchAction,
      selectedTags,
      validateTags,
      get_lat,
      get_lon,
    } = this.props;
    if (prevProps.searchValue && prevProps.searchValue !== searchValue) {
      validateTags(searchValue);
      if (prevProps.selectedTags !== selectedTags) {
        let tags = selectedTags;
        runSearchAction({
          value: searchValue,
          page,
          router,
          tags,
          get_lat,
          get_lon,
        });
      }
    }
  }

  render() {
    let { vehicleList, total, page, tags, searchValue, selectedTags, loading } =
      this.props;
    let [recommendedVehicle] = vehicleList;

    return (
      <>
        <header className={style.Header}>
          <Link href="/">
            <Image src={Logo} alt="logo" className={style.logo} />
          </Link>
          <Navigation />
        </header>
        <section className={style.SearchResults}>
          <header className={style.results}>
            <SearchArea
              onSearch={this.runSearch}
              searchValue={searchValue}
              onSearchChange={this.searchTermChange}
              onToggleTag={this.toggleTag}
              tags={tags}
              selectedTags={selectedTags}
              onRemoveTag={this.removeTag}
            />
          </header>
          {vehicleList.length && !loading ? (
            <>
              <article className={style.results}>
                {vehicleList.map((data, index) => (
                  <CarInfo key={`car_info_${index}`} {...data} />
                ))}
              </article>
              <footer className={style.pagination}>
                <Pagination
                  current={page}
                  defaultCurrent={1}
                  pageSize={1}
                  onChange={this.onChange}
                  total={total}
                  responsive
                />
              </footer>
            </>
          ) : (
            <article className="empty-results">No results</article>
          )}
        </section>
        <Footer />
        <FullPageLoader />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.isLoading,
    get_lat: state.lat,
    get_lon: state.lon,
    vehicleList: getVehicles(state),
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
    setSearchValueAction,
    addTag,
    runSearchAction,
    clearSearchAction,
    removeTag,
    setLat,
    setLon,
    validateTags,
    setAnchor,
  })
)(SearchResults);
