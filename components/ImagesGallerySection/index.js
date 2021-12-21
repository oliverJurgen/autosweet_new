import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import style from "../../old_pages/styles/VehicleDetailsPage.module.css";
import { connect } from "react-redux";

class ImagesGallery extends React.Component {
  render() {
    let { vehicleModel } = this.props;
    let images = [];

    if (vehicleModel && typeof vehicleModel.imageURLs === "string") {
      images = vehicleModel.imageURLs
        .split("|")
        .filter((v) => !!v)
        .map((url) => ({
          original: url,
          thumbnail: url,
          originalClass: "featured-slide",
        }));
    }
    return (
      <article className={style.gallery}>
        <ImageGallery
          showPlayButton={false}
          showFullscreenButton={false}
          lazyLoad={true}
          items={images}
        />
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vehicleModel: state.selectedVehicleItem,
  };
};

export default connect(mapStateToProps)(ImagesGallery);
