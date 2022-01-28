import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import ImageGallery from "react-image-gallery";
import SearchArea from "components/SearchArea";
import Header from "components/shared/Header";
import { Image } from "@chakra-ui/react";
import style from "old_pages/styles/VehicleDetailsPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import useGeolocation from "react-hook-geolocation";
import { useRouter } from "next/router";

import {
  changeResultPageAction,
  setSearchValueAction,
  addTag,
  removeTag,
  clearSearchAction,
} from "redux/actions";

import { getSearchValue, getSelectedTags } from "redux/selectors";
import client from "utils/client";

import ImagesGallerySection from "components/ImagesGallerySection";
import Dislike from "/public/assets/img/icons/VDP_01_Ignore_Toggle_Grey.png";
import DislikeActive from "/public/assets/img/icons/VDP_01_Ignore_Toggle.png";
import LikeActive from "/public/assets/img/icons/VDP_01_Save_Toggle.png";
import CarFaxIcon from "/public/assets/img/icons/carfax-certified-pre-owned-used-car-vehicle-ryan-gosling.jpg";
import Like from "/public/assets/img/icons/VDP_01_Save_Toggle_Grey.png";
import FuelEconomyIcon from "/public/assets/img/icons/VDP_02_Vehicle_Info_Fuel_Economy.png";
// import SellerInfo from "components/SellerInfo";
import VehicleSellerInfo from "components/VehicleSellerInfo";
import VehicleInformation from "components/VehicleInformation";
import VehicleInfoIconBlock from "components/VehicleInfoIconBlock";
// import VehicleInformationSection from "components/VehicleInformationSection";
// import VehicleInformationIconBlock from "components/VehicleInformationIconBlock";
// import OptionsBlock from "components/OptionsBlock";
import VehicleFeatures from "components/VehicleFeatures";
import SellerNotesBlock from "components/SellerNotesBlock";
import SellerNotes from "components/SellerNotes";
import Footer from "components/Footer";

const getConditionDescription = (condition: 1 | 0) => {
  if (condition === 1) return "Pre-Owned";
  if (condition === 0) return "New";
  return "New";
};

const VehicleDetails = (props: any) => {
  const router = useRouter();
  const searchValue = useSelector(getSearchValue);
  const selectedTags = useSelector(getSelectedTags);
  const tags = useSelector((state: any) => state.tags);

  const dispatch = useDispatch();
  const geoLocation = useGeolocation();
  const lat = geoLocation.latitude || "";
  const lon = geoLocation.longitude || "";

  const runSearch = (value: string) => {
    dispatch(changeResultPageAction(1));
    router.push(
      "/search-result?q=" +
        value +
        "&page=1" +
        "&tags=" +
        "&lat=" +
        lat +
        "&lon=" +
        lon
    );
  };
  const searchTermChange = ({ searchValue }: any) => {
    dispatch(setSearchValueAction(searchValue));
  };
  const toggleTag = (tag: any) => {
    dispatch(addTag(tag));
  };

  const handleRemoveTag = (tag: any, isSelected: any) => {
    dispatch(
      removeTag({
        tag,
        isSelected,
      })
    );
  };

  const vehicleModel = props?.vehicleModel;

  const {
    year,
    make,
    model,
    customText,
    imageURLs,
    condition,
    liked,
    disliked,
    mileage,
    highwayMPG,
    cityMPG,
    dealer,
  } = vehicleModel;

  const conditionDescription = getConditionDescription(condition);

  const seoTitle = `${conditionDescription} ${year}
                    ${make} ${model}`;
  const seoDescription = `${customText}`;
  const { asPath } = router;

  const images = imageURLs
    .split("|")
    .filter((v: any) => !!v)
    .map((url: string) => ({
      original: url,
      thumbnail: url,
      originalClass: "featured-slide",
    }));

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`https://dev-autosweet.azurewebsites.net${asPath}`}
        openGraph={{
          type: "website",
          url: `https://dev-autosweet.azurewebsites.net${asPath}`,
          site_name: "Auto Sweet Autos",
          description: "Automotive Marketing Agency for Dealerships",
          images: [
            {
              url: imageURLs,
              width: 400,
              height: 300,
              alt: "AutoSweet Logo",
              type: "image/png",
            },
          ],
        }}
      />
      <Header />
      <main className={style.wrap}>
        <section className={style.results}>
          <header>
            <SearchArea
              onSearch={runSearch}
              searchValue={searchValue}
              onSearchChange={searchTermChange}
              onToggleTag={toggleTag}
              tags={tags}
              selectedTags={selectedTags}
              onRemoveTag={handleRemoveTag}
            />
            <div className={style.info_actions}>
              <div className={style.info_actions_info}>
                <div>
                  {conditionDescription} {year} {make} {model}
                </div>
                <div className={style.gray}>
                  {mileage ? mileage.toLocaleString("en-us") : "-"} Miles
                </div>
              </div>
              <div>
                <picture
                // COMMENT OUT TEMPORARILY
                // onClick={this.onLikeHandler}
                >
                  <Image
                    src={liked ? LikeActive.src : Like.src}
                    alt="Like"
                    className={style.likeActionIcon}
                  />
                </picture>
                <picture
                // COMMENT OUT TEMPORARILY
                // onClick={this.onDisLikeHandler}
                >
                  <Image
                    src={disliked ? DislikeActive.src : Dislike.src}
                    alt="Dislike"
                    className={style.likeActionIcon}
                  />
                </picture>
              </div>
            </div>
          </header>
          {/* IMAGE GALLERY SECTION */}
          <article className={style.gallery}>
            <ImageGallery
              showPlayButton={false}
              showFullscreenButton={false}
              lazyLoad={true}
              items={images}
            />
          </article>
          <VehicleInformation vehicleModel={vehicleModel} />
          <VehicleInfoIconBlock vehicleModel={vehicleModel} />
          {/* <ImagesGallerySection /> */}
          {/* <VehicleInformationSection /> */}
          {/* <VehicleInformationIconBlock /> */}
          <article className={style.fuelEconomy}>
            <picture>
              <Image
                alt="Fuelicon"
                src={FuelEconomyIcon.src}
                className={style.infoBlock}
              />
            </picture>
            <p className={style.blockInfo}>
              Fuel Economy
              <br />
              <span className={style.gray}>
                {cityMPG} City / {highwayMPG} HWY
              </span>
            </p>
          </article>
          {!!Object.keys(dealer).length && (
            <>
              <VehicleSellerInfo vehicleModel={vehicleModel} />
            </>
          )}
          <article className={style.carFax}>
            <picture>
              <Image
                objectFit="contain"
                width="160px"
                alt="carFaxIcon"
                src={CarFaxIcon.src}
                className={style.carFaxIco}
              />
            </picture>
            <p>Get the CarFax vehicle router report</p>
          </article>
          <VehicleFeatures vehicleModel={vehicleModel} />
          <SellerNotes vehicleModel={vehicleModel} />
          {/* <SellerNotesBlock reviews={this.state.reviews} /> */}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default VehicleDetails;

export async function getServerSideProps(ctx: NextPageContext) {
  const vehicleId = ctx?.query?.id;
  const { data } = await client.get(`/api/vehicle/${vehicleId}`);

  return {
    props: {
      vehicleModel: data,
    },
  };
}
