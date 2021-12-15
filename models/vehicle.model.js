import DealerModel from './dealer.model';

export default class VehicleModel {
  constructor(data = {}) {
    this.id = data.id;
    this.make = data.make;
    this.year = data.year;
    this.mileage = data.mileage || '';
    this.model = data.model;
    this.dealer = data.dealer ? new DealerModel(data.dealer) : {};
    this.series = data.series;
    this.engineDescription = data.engineDescription;
    this.extColor = data.extColor;
    this.intColor = data.intColor;
    this.fuelType = data.fuelType;
    this.transmissionType = data.transmissionType;
    this.transmissionDescription = data.transmissionDescription;
    this.cityMPG = data.cityMPG;
    this.highwayMPG = data.highwayMPG;
    this.internetPrice = data.internetPrice || '';
    this.listPrice = data.listPrice || '';
    this.trim = data.trim;
    this.condition = data.condition;
    this.drivetrain = data.drivetrain;
    this.stockNumber = data.stockNumber;
    this.imageURLs = data.imageURLs;
    this.dealerWebsite = data.dealerWebsite;
    this.phoneNumber = data.phoneNumber || '';
    this.customText = data.customText;
    this.options = data.options || '' ;
    this.vin = data.vin;
    this.liked = data.liked;
    this.disliked = data.disliked;
    this.cost = data.cost;
    this.listingPriceMktPriceCompare = data.listingPriceMktPriceCompare;

    switch (data.condition){
      case 1:
        this.conditionDescription = 'Pre-Owned';
        break;
      case 0:
        this.conditionDescription = 'New';
        break;
    }
  }
}
