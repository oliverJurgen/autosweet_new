import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import useGeolocation from 'react-hook-geolocation';
import SearchArea from 'components/SearchArea';
import {
  setSearchValueAction,
  changeResultPageAction,
  removeTag,
  addTag,
} from 'redux/actions';
import { getSearchValue, getSelectedTags } from 'redux/selectors';
import style from 'styles/modules/HomePage.module.css';
import Footer from 'components/Footer';
import client from 'utils/client';
import CenterSpinner from 'components/shared/CenterSpinner/CenterSpinner';
import Header from 'components/shared/Header';

type QuickLinkType = {
  count: number;
  minimumPrice: number;
  name: string;
  type: string;
};

const quicklinkTypes = {
  CONDITION: 'Condition',
  BODY_TYPE: 'BodyType',
  STATE: 'State',
  BRAND: 'Brand',
};

const HomePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const geoLocation = useGeolocation();
  const lat = geoLocation.latitude || '';
  const lon = geoLocation.longitude || '';

  const [quickLinksData, setQuickLinksData] = useState<QuickLinkType[]>();
  const [linksLoading, setLinksloading] = useState(false);
  const linksApiRequest = async () => {
    setLinksloading(true);
    const res: QuickLinkType[] = (await client.get('api/listdata')).data;
    const localStorageData = {
      links: [...res],
      refreshDate: new Date(),
    };
    localStorage.setItem('quickLinks', JSON.stringify(localStorageData));
    setQuickLinksData([...res]);
    setLinksloading(false);
  };
  useEffect(() => {
    let links = localStorage.getItem('quickLinks');
    if (links) {
      const data = JSON.parse(links);
      const diffFromNow =
        Math.abs(new Date().getTime() - new Date(data.refreshDate).getTime()) /
        1000;
      const tmp =
        Math.abs(
          new Date().getTime() - new Date('2021-05-31T15:24:00').getTime()
        ) / 1000;
      console.log(Math.floor(tmp / 86400));
      if (Math.floor(diffFromNow / 3600) % 24 > 24) {
        linksApiRequest();
      } else {
        setQuickLinksData(data.links);
      }
    } else {
      linksApiRequest();
    }
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
                {quickLinksData?.map((item: QuickLinkType, index) => {
                  if (item.type === quicklinkTypes.CONDITION)
                    return (
                      <Link href={`/search/${item.name}`} passHref key={index}>
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
                {quickLinksData?.map((item: QuickLinkType, index) => {
                  if (item.type === quicklinkTypes.BRAND)
                    return (
                      <Link href={`/search/${item.name}`} passHref key={index}>
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
                {quickLinksData?.map((item: QuickLinkType, index) => {
                  if (item.type === quicklinkTypes.BODY_TYPE)
                    return (
                      <Link
                        href={getQuerySearchUrl(item.name)}
                        passHref
                        key={index}
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
                {quickLinksData?.map((item: QuickLinkType, index) => {
                  if (item.type === quicklinkTypes.STATE)
                    return (
                      <Link href={`/search/${item.name}`} passHref key={index}>
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
