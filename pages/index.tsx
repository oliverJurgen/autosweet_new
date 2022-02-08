import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { NextSeo } from "next-seo";
import useGeolocation from "react-hook-geolocation";
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
import dynamic from "next/dynamic";
import Header from "components/shared/Header";
import isStaging from "utils/isStaging";
import { Flex, Image } from "@chakra-ui/react";
import CarImage from "public/assets/img/imageedit_1_9231715404.png";

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

const SearchArea = dynamic(() => import("components/SearchArea"), {
  ssr: false,
});

// console.log({
//   env: process.env.NEXT_PUBLIC_NODE_ENV,
//   nodeEnv: process.env.NODE_ENV,
// });

const HomePage: NextPage = (props: any) => {
  console.log({ isStaging: isStaging() });
  const router = useRouter();
  const dispatch = useDispatch();
  const geoLocation = useGeolocation();
  const lat = geoLocation.latitude || "";
  const lon = geoLocation.longitude || "";

  const quickLinksData = props.listData;

  const getBodyTypeUrl = (value: string) => {
    if (value && value.indexOf(" ") >= 0) {
      const searchWordsArr = value.split(" ");
      const searchVal = searchWordsArr.join("-");
      return `search/${searchVal}`;
    }
    return `search/${value}`;
  };

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
      <Head>
        <meta
          name="google-site-verification"
          content="-t2NYxo_sURLxJXYnOWgCl9Q-8Lze6c_kykg3u3oU1U"
        />
      </Head>
      <NextSeo
        noindex={isStaging() && true}
        nofollow={isStaging() && true}
        title="New and Used Cars for Sale | AutoSweet"
        description="The biggest database of used and pre-owned vehicles you can find in your area."
        canonical="https://dev-autosweet.azurewebsites.net/"
        openGraph={{
          type: "website",
          url: "https://dev-autosweet.azurewebsites.net/",
          site_name: "Auto Sweet Autos",
          description:
            "The biggest database of used and pre-owned vehicles you can find in your area.",
          images: [
            {
              url: "/assets/img/icons/AutosweetAUTOS_Final-1png-03.png",
              width: 200,
              height: 100,
              alt: "AutoSweet Logo",
              type: "image/png",
            },
          ],
        }}
      />
      <Header />
      <main>
        {/* <section className={style.searchSection}>
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
        </section> */}

        <Flex
          justify="center"
          className={style.searchSection}
          bgGradient="linear(to-b, #303030, rgba(255, 255, 255, 0))"
        >
          <Image
            height="58vh"
            width="100%"
            src={CarImage.src}
            position="absolute"
            zIndex={-9999}
            loading="lazy"
            objectFit="cover"
          />
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
        </Flex>

        <section className={style.quickLinkSection}>
          <article className={style.linkArticle}>
            <header>
              <p className={style.linkArticleHeader}>
                <b>Condition</b>
              </p>
            </header>
            <div className={style.linkCardsBlock}>
              {quickLinksData?.map((item: QuickLinkType, index: number) => {
                if (item.type === quicklinkTypes.CONDITION)
                  return (
                    <Link href={`/search/${item.name}`} passHref key={index}>
                      <a>
                        <div className={style.linkCard}>
                          <h5 className={style.linkCardHeader}>{item.name}</h5>
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
              {quickLinksData?.map((item: QuickLinkType, index: number) => {
                if (item.type === quicklinkTypes.BRAND)
                  return (
                    <Link href={`/search/${item.name}`} passHref key={index}>
                      <a>
                        <div className={style.linkCard}>
                          <h5 className={style.linkCardHeader}>{item.name}</h5>
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
              {quickLinksData?.map((item: QuickLinkType, index: number) => {
                if (item.type === quicklinkTypes.BODY_TYPE) {
                  return (
                    <Link href={getBodyTypeUrl(item.name)} passHref key={index}>
                      <a>
                        <div className={style.linkCard}>
                          <h5 className={style.linkCardHeader}>{item.name}</h5>
                          <p className={style.linkCardBody}>
                            {item.count} Listings
                            <br />
                            Start from ${item.minimumPrice}
                          </p>
                        </div>
                      </a>
                    </Link>
                  );
                }
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
              {quickLinksData?.map((item: QuickLinkType, index: number) => {
                if (item.type === quicklinkTypes.STATE)
                  return (
                    <Link href={`/search/${item.name}`} passHref key={index}>
                      <a>
                        <div className={style.linkCard}>
                          <h5 className={style.linkCardHeader}>{item.name}</h5>
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
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

export async function getServerSideProps() {
  const res = await client.get("api/listdata");
  const listData = res.data;

  return {
    props: {
      listData,
    }, // will be passed to the page component as props
  };
}
