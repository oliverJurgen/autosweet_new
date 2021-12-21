import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import style from "../../old_pages/styles/VehicleDetailsPage.module.css";
import { connect } from "react-redux";

class VehicleInformationIconBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCategoryCount: 2,
    };
  }

  render() {
    let { vehicleModel } = this.props;
    return (
      <article className={style.features}>
        {vehicleModel.options &&
          vehicleModel.options.map((item) => (
            <div className={style.tag}>
              <div className="tab">
                <h3 className={style.featureHeader}>
                  {vehicleModel.options.length === 1
                    ? "Features"
                    : item.category}
                </h3>
                <div>
                  {
                    <ul className={style.options}>
                      {item.values.slice(0, 6).map((value) => (
                        <li>{value}</li>
                      ))}
                    </ul>
                  }
                </div>
                <input id={item.category} type="checkbox" />
                <label for={item.category} className={style.featureShow}>
                  Show More
                </label>
                <div className="tab-content">
                  {
                    <ul className={style.options}>
                      {item.values.slice(6).map((value) => (
                        <li>{value}</li>
                      ))}
                    </ul>
                  }
                </div>
              </div>
            </div>
          ))}
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vehicleModel: state.selectedVehicleItem,
  };
};

export default connect(mapStateToProps)(VehicleInformationIconBlock);
