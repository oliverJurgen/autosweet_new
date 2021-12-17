import React from "react";
import { compose } from "redux";
// import { withRouter } from 'react-router-dom';
import { withRouter } from "next/router";
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
      <div className="home-grid">
        <header className="homeHeader">
          <Navigation />
        </header>
        <div className="logoHome" />
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
