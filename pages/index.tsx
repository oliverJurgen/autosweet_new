import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useGeolocation from "react-hook-geolocation";
import SearchArea from "components/SearchArea";
import {
  setSearchValueAction,
  changeResultPageAction,
  removeTag,
  addTag,
} from "redux/actions";
import { getSearchValue, getSelectedTags } from "redux/selectors";
import style from "styles/modules/HomePage.module.css";
import Footer from "components/Footer";
import client from "utils/client";
import CenterSpinner from "components/shared/CenterSpinner/CenterSpinner";
import Header from "components/shared/Header";
// import client from 'utils/client'

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

const HomePage: NextPage = (props: any) => {
  console.log({ props });

  const router = useRouter();
  const dispatch = useDispatch();
  const geoLocation = useGeolocation();
  const lat = geoLocation.latitude || "";
  const lon = geoLocation.longitude || "";

  const [quickLinksData, setQuickLinksData] = useState([]);
  const [linksLoading, setLinksloading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLinksloading(true);
        const res = (await client.get("api/listdata")).data;
        setQuickLinksData(res);
        setLinksloading(false);
      } catch (error) {
        setLinksloading(false);
        throw error;
      }
    })();
  }, []);

  const getQuerySearchUrl = (value: string) =>
    `/search-result?q=${value}&page=1&tags=&lat=${lat}&lon=${lon}`;

  const searchValue = useSelector(getSearchValue);
  const selectedTags = useSelector(getSelectedTags);
  const tags = useSelector((state: any) => state.tags);

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
        {linksLoading ? (
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
                {quickLinksData.map((item: QuickLinkType) => {
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
                {quickLinksData.map((item: QuickLinkType) => {
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
                {quickLinksData.map((item: QuickLinkType) => {
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
                {quickLinksData.map((item: QuickLinkType) => {
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

export async function getServerSideProps() {
  console.log("Server side fetch");
  const res = await client.get("api/listdata");
  const listApiData = res.data;
  return {
    props: {
      listApiData,
    }, // will be passed to the page component as props
  };
}
