import React from 'react';
import style from './VehicleRecomend.module.css';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Social from '../Social/Social';


class VehicleRecomend extends React.Component {
  render() {         
    let { vehicle } = this.props;
    const image = vehicle.imageURLs && vehicle.imageURLs.split('|')[0];
    return (
      
      <div className={style.ResultItem}>
        <div className={style.ad}>{vehicle.dealer.dealerWebsite}</div>
        <div className={style.itemImg}>
          <img src={image} alt="" />
        </div>
        <div className={style.itemInfo}>
          
          <h3>
            {' '}
            {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.series}{' '}
          </h3>
          <div className={`${style.arrow} ${vehicle.listingPriceMktPriceCompare}`}>
              ${vehicle.listPrice || vehicle.internetPrice || vehicle.cost || '-'}{' '}
              <FontAwesomeIcon  icon={faArrowAltCircleUp} />
            </div> 
            <div className={style.socialIcons}>
              <Social />
            </div>
          <div>
            Millage: {vehicle.mileage}<br/>
            MPG: Up to {vehicle.cityMPG} City / {vehicle.highwayMPG} HWY<br/>
            Exterior:{' '}{vehicle.extColor} Interior: {vehicle.intColor}<br/>
            Engine: {vehicle.engineDescription}-{' '}<br/>
            Transmission: {vehicle.transmissionType}<br/>          
          </div>
          <div className={style.pricefooter}>
            <button className={`${style.btn} ${style.gbtn}`}>BUY NOW</button>
            <button className={`${style.btn} ${style.gbtn}`}>SCHEDULE TEST DRIVE</button>
            <button className={`${style.btn} ${style.bbtn}`}>800-980-1244</button>
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleRecomend;
