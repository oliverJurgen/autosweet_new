import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import useGeolocation from "react-hook-geolocation";
import SearchArea from "components/SearchArea";
import { useQuery } from "react-query";
import { chakra as c } from "@chakra-ui/react";
import {
  setSearchValueAction,
  changeResultPageAction,
  removeTag,
  addTag,
} from "redux/actions";
import { getSearchValue, getSelectedTags } from "redux/selectors";
import Navigation from "components/Navigation";
import style from "styles/modules/HomePage.module.css";
import Logo from "public/assets/img/icons/AutosweetAUTOS_Final-1png-03.png";
import Footer from "components/Footer";
import client from "utils/client";
import CenterSpinner from "components/shared/CenterSpinner/CenterSpinner";
import Header from "components/shared/Header";

const fetchQuickLinks = async () => {
  try {
    const res = await client.get("api/listdata");
    return res.data;
  } catch (error) {
    throw error;
  }
};

type QuickLinkType = {
  count: number;
  minimumPrice: number;
  name: string;
  type: string;
};

const quicklinkTypes = {
  CONDITION: "Condition",
  BODY_TYPE: "BodyType",
  STATE: "State",
  BRAND: "Brand",
};

const HomePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const geoLocation = useGeolocation();
  const lat = geoLocation.latitude || "";
  const lon = geoLocation.longitude || "";

  const getQuerySearchUrl = (value: string) =>
    "/search-result?q=" +
    value +
    "&page=1" +
    "&tags=" +
    "&lat=" +
    lat +
    "&lon=" +
    lon;

  const searchValue = useSelector(getSearchValue);
  const selectedTags = useSelector(getSelectedTags);
  const tags = useSelector((state: any) => state.tags);

  const { data, isLoading } = useQuery(["quicklinks"], fetchQuickLinks);

  const runSearch = (value: string) => {
    dispatch(changeResultPageAction(1));
    router.push(getQuerySearchUrl(value));
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

  return (
    <>
      <Header />
      <main>
        <section className={style.searchSection}>
          <div>
            <SearchArea
              dark={true}
              tags={tags}
              selectedTags={selectedTags}
              onSearch={runSearch}
              searchValue={searchValue}
              onSearchChange={searchTermChange}
              onRemoveTag={handleRemoveTag}
              onToggleTag={toggleTag}
            />
          </div>
        </section>
        {isLoading ? (
          <CenterSpinner />
        ) : (
          <section className={style.quickLinkSection}>
            <article className={style.linkArticle}>
              <header>
                <p className={style.linkArticleHeader}>
                  <b>Condition</b>
                </p>
              </header>
              <div className={style.linkCardsBlock}>
                {data.map((item: QuickLinkType) => {
                  if (item.type === quicklinkTypes.CONDITION)
                    return (
                      <Link
                        key={item?.name}
                        href={`/search/${item.name}`}
                        passHref
                      >
                        <a>
                          <div className={style.linkCard}>
                            <h5 className={style.linkCardHeader}>
                              {item.name}
                            </h5>
                            <p className={style.linkCardBody}>
                              {item.count} Listings
                              <br />
                              Start from ${item.minimumPrice}
                            </p>
                          </div>
                        </a>
                      </Link>
                    );
                })}
              </div>
            </article>
            <article className={style.linkArticle}>
              <header>
                <p className={style.linkArticleHeader}>
                  <b>Brands</b>
                </p>
              </header>
              <div className={style.linkCardsBlock}>
                {data.map((item: QuickLinkType) => {
                  if (item.type === quicklinkTypes.BRAND)
                    return (
                      <Link
                        key={item?.name}
                        href={`/search/${item.name}`}
                        passHref
                      >
                        <a>
                          <div className={style.linkCard}>
                            <h5 className={style.linkCardHeader}>
                              {item.name}
                            </h5>
                            <p className={style.linkCardBody}>
                              {item.count} Listings
                              <br />
                              Start from ${item.minimumPrice}
                            </p>
                          </div>
                        </a>
                      </Link>
                    );
                })}
              </div>
            </article>

            <article className={style.linkArticle}>
              <header>
                <p className={style.linkArticleHeader}>
                  <b>Body Type</b>
                </p>
              </header>
              <div className={style.linkCardsBlock}>
                {data.map((item: QuickLinkType) => {
                  if (item.type === quicklinkTypes.BODY_TYPE)
                    return (
                      <Link
                        key={item?.name}
                        href={getQuerySearchUrl(item.name)}
                        passHref
                      >
                        <a>
                          <div className={style.linkCard}>
                            <h5 className={style.linkCardHeader}>
                              {item.name}
                            </h5>
                            <p className={style.linkCardBody}>
                              {item.count} Listings
                              <br />
                              Start from ${item.minimumPrice}
                            </p>
                          </div>
                        </a>
                      </Link>
                    );
                })}
              </div>
            </article>

            <article className={style.linkArticle}>
              <header>
                <p className={style.linkArticleHeader}>
                  <b>State</b>
                </p>
              </header>
              <div className={style.linkCardsBlock}>
                {data.map((item: QuickLinkType) => {
                  if (item.type === quicklinkTypes.STATE)
                    return (
                      <Link
                        key={item?.name}
                        href={`/search/${item.name}`}
                        passHref
                      >
                        <a>
                          <div className={style.linkCard}>
                            <h5 className={style.linkCardHeader}>
                              {item.name}
                            </h5>
                            <p className={style.linkCardBody}>
                              {item.count} Listings
                              <br />
                              Start from ${item.minimumPrice}
                            </p>
                          </div>
                        </a>
                      </Link>
                    );
                })}
              </div>
            </article>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
