export default class DealerModel {
  constructor(data = {}) {
    this.autoSweetDealerID = data.autoSweetDealerID;
    this.dealerCity = data.dealerCity;
    this.dealerName = data.dealerName;
    this.dealerState = data.dealerState;
    this.dealerStreet1 = data.dealerStreet1;
    this.dealerStreet2 = data.dealerStreet2;
    this.dealerWebsite = data.dealerWebsite;
    this.dealerZipCode = data.dealerZipCode;
    this.id = data.id;
    this.phoneNumber = data.phoneNumber || "";
    this.salesHours = data.salesHours;
    this.vehicleURL = data.vehicleURL;
    this.coordinates = data.coordinates;
    this.chatMeterLocationId = data.chatMeterLocationId;
    this.googleScore = data.googleScore;
    this.numberOfGoogleReviews = data.numberOfGoogleReviews;
    this.facebookScore = data.facebookScore;
    this.numberOfFacebookReviews = data.numberOfFacebookReviews;
  }
}
