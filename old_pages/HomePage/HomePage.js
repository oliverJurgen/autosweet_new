import React from "react";
import { compose } from "redux";
// import { withRouter } from 'react-router-dom';
import { withRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { connect } from "react-redux";
import SearchArea from "../../components/SearchArea";
import {
  getTags,
  performSearchAction,
  setSearchValueAction,
  changeResultPageAction,
  setLon,
  setLat,
  removeTag,
  addTag,
} from "../../redux/actions";
import { getSearchValue, getSelectedTags } from "../../redux/selectors";
import Navigation from "../../components/Navigation";
import style from "../../styles/modules/HomePage.module.css";
import Logo from "../../public/assets/img/icons/AutosweetAUTOS_Final-1png-03.png";
import Footer from "../../components/Footer";
import quickLinks from "constants/quickLinks";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.runSearch = this.runSearch.bind(this);
    this.searchTermChange = this.searchTermChange.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.state = {
      lat: 0,
      lon: 0,
    };
  }

  removeTag(tag, isSelected) {
    this.props.removeTag({
      tag,
      isSelected,
    });
  }
  toggleTag(tag) {
    this.props.addTag(tag);
  }

  runSearch(value) {
    this.props.changeResultPageAction(1);
    this.props.router.push(
      "/search-result?q=" +
        value +
        "&page=1" +
        "&tags=" +
        "&lat=" +
        this.props.lat +
        "&lon=" +
        this.props.lon
    );
  }

  searchTermChange({ searchValue }) {
    this.props.setSearchValueAction(searchValue);
  }

  componentDidMount() {
    const { setLat, setLon, lat, lon } = this.props;
    if (!lat && !lon) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          if (position.coords.latitude) {
            setLat(position.coords.latitude.toString().slice(0, 11));
            setLon(position.coords.longitude.toString().slice(0, 11));
          }
        });
      }
    }
  }

  render() {
    const { tags, searchValue, selectedTags } = this.props;
    return (
      <>
        <header className={style.header}>
          <Link href="/">
            <picture>
              <Image src={Logo} alt="logo" className={style.logo} />
            </picture>
          </Link>
          <Navigation />
        </header>
        <main>
          <section className={style.searchSection}>
            <div>
              <SearchArea
                dark={true}
                tags={tags}
                selectedTags={selectedTags}
                onSearch={this.runSearch}
                searchValue={searchValue}
                onSearchChange={this.searchTermChange}
                onRemoveTag={this.removeTag}
                onToggleTag={this.toggleTag}
              />
            </div>
          </section>
          <section className={style.quickLinkSection}>
            <article className={style.linkArticle}>
              <header>
                <p className={style.linkArticleHeader}>
                  <b>Condition</b>
                </p>
              </header>
              <div className={style.linkCardsBlock}>
                {quickLinks.condition.map((item) => (
                  <Link href={`/search/${item.type}`} passHref>
                    <a>
                      <div className={style.linkCard}>
                        <h5 className={style.linkCardHeader}>{item.name}</h5>
                        <p className={style.linkCardBody}>
                          {item.count} Listings
                          <br />
                          Start from ${item.price}
                        </p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </article>
            <article className={style.linkArticle}>
              <header>
                <p className={style.linkArticleHeader}>
                  <b>Brands</b>
                </p>
              </header>
              <div className={style.linkCardsBlock}>
                {quickLinks.brands.map((item) => (
                  <Link href={`/search/${item.name}`} passHref>
                    <a>
                      <div className={style.linkCard}>
                        <h5 className={style.linkCardHeader}>{item.name}</h5>
                        <p className={style.linkCardBody}>
                          {item.count} Listings
                        </p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </article>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lat: state.lat,
    lon: state.lon,
    tags: state.tags,
    selectedTags: getSelectedTags(state),
    searchValue: getSearchValue(state),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    setSearchValueAction,
    changeResultPageAction,
    setLon,
    setLat,
    removeTag,
    addTag,
  })
)(HomePage);
