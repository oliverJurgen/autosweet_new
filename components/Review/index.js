import React, { Component } from "react";
import style from "./Review.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { Rate } from "antd";

export default class index extends Component {
  render() {
    return (
      <div
        className={
          this.props.border
            ? `${style.border} ${style.ReviewItem}`
            : `${style.ReviewItem} ${style.separator}`
        }
      >
        <div className={style.stars}>
          <Rate disabled value={this.props.stars} />
        </div>
        <div className={style.title}>{this.props.title}</div>
        <div className={style.description}>{this.props.body}</div>
        <div className={style.userInfo}>
          <div className={style.avatar}>
            {this.props.avatar ? (
              <img src={this.props.avatar} alt="avatar" />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                color="white"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </div>
          <div>
            <div className={`${style.greyText} ${style.fs12}`}>
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(this.props.date))}
            </div>
            <div className={`${style.greyText} ${style.fs12}`}>
              {this.props.userName}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
