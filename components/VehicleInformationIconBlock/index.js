import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import style from "../../old_pages/styles/VehicleDetailsPage.module.css";
import { connect } from "react-redux";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Social from "./../Social/Social";
import { Input, Radio } from "antd";
import Image from "next/image";
import Condition from "public/assets/img/icons/VDP_02_Vehicle_Info_Condition.png";
import Trim from "public/assets/img/icons/VDP_02_Vehicle_Info_Trim.png";
import Mileage from "public/assets/img/icons/VDP_02_Vehicle_Info_Mileage.png";
import StockNumber from "public/assets/img/icons/VDP_02_Vehicle_Info_Stock.png";
import EngineDescription from "public/assets/img/icons/VDP_02_Vehicle_Info_Engine.png";
import TrasmissionIcon from "public/assets/img/icons/VDP_02_Vehicle_Info_Transmission.png";
import Drivetrain from "public/assets/img/icons/VDP_02_Vehicle_Info_Drive.png";
import ExtColor from "public/assets/img/icons/VDP_02_Vehicle_Info_Exterior.png";
import IntColor from "public/assets/img/icons/VDP_02_Vehicle_Info_Interior.png";
import FuelType from "public/assets/img/icons/VDP_02_Vehicle_Info_Fuel.png";

class VehicleInformationIconBlock extends React.Component {
  render() {
    let { vehicleModel } = this.props;
    return (
      <article className={style.vehicalInfoBlock}>
        <header>
          <h3 className={style.VehicleInfo}>Vehicle Information:</h3>
        </header>
        <div className={style.InformationBlock}>
          <div>
            <div className={style.InformationBlockItem}>
              <picture>
                <Image
                  src={Condition}
                  alt="sectionIcon"
                  className={style.infoBlock}
                />
              </picture>
              <p>
                Condition
                <br />
                <span className={style.gray}>
                  {
                    {
                      1: <div>Used</div>,
                      0: <div>New</div>,
                    }[vehicleModel.condition]
                  }
                </span>
              </p>
            </div>
            <div className={style.InformationBlockItem}>
              <picture>
                <Image
                  src={Trim}
                  alt="sectionIcon"
                  className={style.infoBlock}
                />
              </picture>
              <p>
                Trim <br />
                <span className={style.gray}>{vehicleModel.trim}</span>
              </p>
            </div>
            <div className={style.InformationBlockItem}>
              <picture>
                <Image
                  src={Mileage}
                  alt="sectionIcon"
                  className={style.infoBlock}
                />
              </picture>
              <p>
                Mileage
                <br />
                <span className={style.gray}>
                  {vehicleModel.mileage
                    ? vehicleModel.mileage.toLocaleString("en-us")
                    : "-"}
                </span>
              </p>
            </div>
            <div className={style.InformationBlockItem}>
              <picture>
                <Image
                  src={StockNumber}
                  alt="sectionIcon"
                  className={style.infoBlock}
                />
              </picture>
              <p>
                Stock #<br />
                <span className={style.gray}>{vehicleModel.stockNumber}</span>
              </p>
            </div>
            <div className={style.InformationBlockItem}>
              <picture>
                <Image
                  src={EngineDescription}
                  alt="sectionIcon"
                  className={style.infoBlock}
                />
              </picture>
              <p>
                Engine
                <br />
                <span className={style.gray}>
                  {vehicleModel.engineDescription}
                </span>
              </p>
            </div>
          </div>
          <div>
            <div className={style.InformationBlockItem}>
              <picture>
                <Image
                  src={TrasmissionIcon}
                  alt="sectionIcon"
                  className={style.infoBlock}
                />
              </picture>
              <p>
                Transmission
                <br />
                <span className={style.gray}>
                  {vehicleModel.transmissionDescription}
                </span>
              </p>
            </div>
            <div className={style.InformationBlockItem}>
              <picture>
                <Image
                  src={Drivetrain}
                  alt="sectionIcon"
                  className={style.infoBlock}
                />
              </picture>
              <p>
                Drive Train
                <br />
                <span className={style.gray}>{vehicleModel.drivetrain}</span>
              </p>
            </div>
            <div className={style.InformationBlockItem}>
              <picture>
                <Image
                  src={ExtColor}
                  alt="sectionIcon"
                  className={style.infoBlock}
                />
              </picture>
              <p>
                Exterior Color
                <br />
                <span className={style.gray}>{vehicleModel.extColor}</span>
              </p>
            </div>
            <div className={style.InformationBlockItem}>
              <picture>
                <Image
                  src={IntColor}
                  alt="sectionIcon"
                  className={style.infoBlock}
                />
              </picture>
              <p>
                Interior Color
                <br />
                <span className={style.gray}>{vehicleModel.intColor}</span>
              </p>
            </div>
            <div className={style.InformationBlockItem}>
              <picture>
                <Image
                  src={FuelType}
                  alt="sectionIcon"
                  className={style.infoBlock}
                />
              </picture>
              <p>
                Fuel
                <br />
                <span className={style.gray}>{vehicleModel.fuelType}</span>
              </p>
            </div>
          </div>
        </div>
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
