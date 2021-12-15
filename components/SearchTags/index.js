import React from 'react';
import style from '../SearchArea/SearchArea.module.css';
import clsx from 'clsx';
import selectedCloseIconSrc from '../../assets/img/icons/close-white.png';
import closeIcon from '../../assets/img/icons/clean.png';

export default class SearchTags extends React.Component {
  constructor(props) {
    super(props);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  addTag(tag) {
    const { onSelectTag } = this.props;
    if (onSelectTag) {
      onSelectTag(tag);
    }
  }

  removeTag(e, tag) {
    e.preventDefault();
    e.stopPropagation();
    const { onRemoveTag } = this.props;
    if (onRemoveTag) {
      onRemoveTag(tag);
    }
  }

  render() {
    const { tags, selected } = this.props;
    return (
      <>
        {tags.map((tag, i) => (
          <div
            key={`tag_${i}${selected && 's'}`}
            className={clsx([style.tag, selected && style.selectedTag])}
            onClick={() => this.addTag(tag)}
          >
            <div
              className={clsx([style.icon, style.delete])}
              onClick={(e) => this.removeTag(e, tag)}
            >
              <img
                src={selected ? selectedCloseIconSrc : closeIcon}
                alt="Delete"
              />
            </div>
            <div className={style.tagText}>{tag}</div>
          </div>
        ))}
      </>
    );
  }
}
