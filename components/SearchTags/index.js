import React from "react";
import style from "../SearchArea/SearchArea.module.css";
import clsx from "clsx";
import { chakra, Wrap, WrapItem, Image } from "@chakra-ui/react";
import selectedCloseIconSrc from "public/assets/img/icons/close-white.png";
import closeIcon from "public/assets/img/icons/clean.png";

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
      <Wrap spacing="1px">
        {tags.map((tag, i) => (
          <WrapItem>
            <chakra.div
              d="flex"
              alignItems={"center"}
              key={`tag_${i}${selected && "s"}`}
              className={clsx([style.tag, selected && style.selectedTag])}
              onClick={() => this.addTag(tag)}
            >
              <div
                className={clsx([style.icon, style.delete])}
                onClick={(e) => this.removeTag(e, tag)}
              >
                <Image
                  src={selected ? selectedCloseIconSrc.src : closeIcon.src}
                  alt="Delete"
                />
              </div>
              <div className={style.tagText}>{tag}</div>
            </chakra.div>
          </WrapItem>
        ))}
      </Wrap>
    );
  }
}
