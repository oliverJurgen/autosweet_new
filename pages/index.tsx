import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import useGeolocation from "react-hook-geolocation";
import SearchArea from "components/SearchArea";
import {
  // getTags,
  // performSearchAction,
  setSearchValueAction,
  changeResultPageAction,
  removeTag,
  addTag,
} from "redux/actions";
import { getSearchValue, getSelectedTags } from "redux/selectors";
import Navigation from "components/Navigation";
// import style from "styles/modules/HomePage.module.css";
import style from "styles/modules/HomePage.module.css";
import Logo from "public/assets/img/icons/AutosweetAUTOS_Final-1png-03.png";
import Footer from "components/Footer";
import quickLinks from "constants/quickLinks";

const HomePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const geoLocation = useGeolocation();
  console.log({ geoLocation });

  const searchValue = useSelector(getSearchValue);
  const selectedTags = useSelector(getSelectedTags);
  const tags = useSelector((state: any) => state.tags);

  const runSearch = (value: string) => {
    const lat = geoLocation.latitude || "";
    const lon = geoLocation.longitude || "";
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

  return (
    <>
      <header className={style.header}>
        <Link href="/">
          <picture>
            <Image src={Logo} alt="logo" className={style.logo} />
          </picture>
        </Link>
        <Navigation />
      </header>
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
        <section className={style.quickLinkSection}>
          <article className={style.linkArticle}>
            <header>
              <p className={style.linkArticleHeader}>
                <b>Condition</b>
              </p>
            </header>
            <div className={style.linkCardsBlock}>
              {quickLinks.condition.map((item) => (
                <Link href={`/search/${item.type}`} passHref>
                  <a>
                    <div className={style.linkCard}>
                      <h5 className={style.linkCardHeader}>{item.name}</h5>
                      <p className={style.linkCardBody}>
                        {item.count} Listings
                        <br />
                        Start from ${item.price}
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </article>
          <article className={style.linkArticle}>
            <header>
              <p className={style.linkArticleHeader}>
                <b>Brands</b>
              </p>
            </header>
            <div className={style.linkCardsBlock}>
              {quickLinks.brands.map((item) => (
                <Link href={`/search/${item.name}`} passHref>
                  <a>
                    <div className={style.linkCard}>
                      <h5 className={style.linkCardHeader}>{item.name}</h5>
                      <p className={style.linkCardBody}>
                        {item.count} Listings
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
