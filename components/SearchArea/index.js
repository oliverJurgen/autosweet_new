import React from "react";
import style from "./SearchArea.module.css";
import closeIcon from "public/assets/img/icons/clean.png";
import Image from "next/image";
import tagIcon from "public/assets/img/icons/SRP_02_Tag_Black.png";
import searchIcon from "public/assets/img/icons/Landing_Page_02_Search_icon.png";
import clsx from "clsx";
import SearchTags from "../SearchTags";

const MIN_SYMBOL_COUNT = 1;
const TAGS_VISIBILITY_COUNT = 10;

class SearchArea extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.toggleTagsPanel = this.toggleTagsPanel.bind(this);
    this.cleanSearch = this.cleanSearch.bind(this);
    this.showMore = this.showMore.bind(this);

    this.state = {
      showTagsPanel: false,
      visibleTagsCount: TAGS_VISIBILITY_COUNT,
    };
  }

  handleChange(event) {
    this.props.onSearchChange({ searchValue: event.target.value });
  }

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.search();
    }
  }

  search() {
    const { searchValue, onSearch } = this.props;
    if (searchValue.length > MIN_SYMBOL_COUNT && onSearch) {
      console.log({ searchValue });
      onSearch(searchValue);
    }
  }

  cleanSearch() {
    this.props.onSearchChange({ searchValue: "", page: 1 });
  }

  toggleTagsPanel() {
    this.setState((state) => ({ showTagsPanel: !state.showTagsPanel }));
  }

  showMore() {
    this.setState((state) => ({
      visibleTagsCount: state.visibleTagsCount + TAGS_VISIBILITY_COUNT,
    }));
  }

  render() {
    const { tags, dark, searchValue, selectedTags, onToggleTag, onRemoveTag } =
      this.props;
    const { visibleTagsCount, showTagsPanel } = this.state;
    return (
      <div className={clsx([style.searcharea, dark && style.dark])}>
        <div className={style.search}>
          <div className={clsx([style.icon])} onClick={this.search}>
            <Image src={searchIcon} alt="Search" />
          </div>
          <input
            type="text"
            className={style.searchTerm}
            onChange={this.handleChange}
            value={searchValue}
            onKeyPress={this.handleKeyDown}
          />
          <div
            className={clsx([style.icon, style.clean])}
            onClick={this.cleanSearch}
          >
            <Image src={closeIcon} alt="Clean" />
          </div>
          <div className={style.divider}></div>
          <div className={clsx([style.icon])} onClick={this.toggleTagsPanel}>
            <Image src={tagIcon} alt="Tag" />
          </div>
        </div>
        {showTagsPanel && (
          <div className={style.tagBox}>
            <SearchTags
              tags={selectedTags}
              selected={true}
              onSelectTag={() => {}}
              onRemoveTag={(tag) => onRemoveTag.call(null, tag, true)}
            ></SearchTags>
            <SearchTags
              tags={tags.filter((v, index) => index <= visibleTagsCount)}
              onSelectTag={onToggleTag}
              onRemoveTag={onRemoveTag}
            ></SearchTags>
            {visibleTagsCount < tags.length && (
              <div onClick={this.showMore} className={style.seeMore}>
                See More
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SearchArea;
