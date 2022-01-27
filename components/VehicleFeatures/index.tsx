import VehicleModel from "models/vehicle.model";
import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import style from "../../old_pages/styles/VehicleDetailsPage.module.css";

type Props = {
  vehicleModel: any;
};

class VehicleFeatues extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showCategoryCount: 2,
    };
  }

  render() {
    const { vehicleModel } = this.props;
    return (
      <article className={style.features}>
        {vehicleModel.options &&
          vehicleModel.options.map((item: any) => (
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
                      {item.values.slice(0, 6).map((value: any) => (
                        <li>{value}</li>
                      ))}
                    </ul>
                  }
                </div>
                <input id={item.category} type="checkbox" />
                <label
                  // @ts-ignore
                  for={item.category}
                  className={style.featureShow}
                >
                  Show More
                </label>
                <div className="tab-content">
                  {
                    <ul className={style.options}>
                      {item.values.slice(6).map((value: any) => (
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

export default VehicleFeatues;
