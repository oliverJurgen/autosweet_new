import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { NextSeo } from "next-seo";
import useGeolocation from "react-hook-geolocation";
// import SearchArea from "components/SearchArea";
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

const HomePage: NextPage = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const geoLocation = useGeolocation();
  const lat = geoLocation.latitude || "";
  const lon = geoLocation.longitude || "";

  const quickLinksData = props.listData;

  // const [quickLinksData, setQuickLinksData] = useState<QuickLinkType[]>();
  // const [linksLoading, setLinksloading] = useState(false);
  // const linksApiRequest = async () => {
  //   setLinksloading(true);
  //   const res: QuickLinkType[] = (await client.get("api/listdata")).data;
  //   const localStorageData = {
  //     links: [...res],
  //     refreshDate: new Date(),
  //   };
  //   localStorage.setItem("quickLinks", JSON.stringify(localStorageData));
  //   setQuickLinksData([...res]);
  //   setLinksloading(false);
  // };
  // useEffect(() => {
  //   let links = localStorage.getItem("quickLinks");
  //   if (links) {
  //     const data = JSON.parse(links);
  //     const diffFromNow =
  //       Math.abs(new Date().getTime() - new Date(data.refreshDate).getTime()) /
  //       1000;
  //     const tmp =
  //       Math.abs(
  //         new Date().getTime() - new Date("2021-05-31T15:24:00").getTime()
  //       ) / 1000;
  //     console.log(Math.floor(tmp / 86400));
  //     if (Math.floor(diffFromNow / 3600) % 24 > 24) {
  //       linksApiRequest();
  //     } else {
  //       setQuickLinksData(data.links);
  //     }
  //   } else {
  //     linksApiRequest();
  //   }
  // }, []);

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
        {/* <meta
          name="google-site-verification"
          content="-t2NYxo_sURLxJXYnOWgCl9Q-8Lze6c_kykg3u3oU1U"
        /> */}
        <meta
          name="google-site-verification"
          content="s21crY2hKxA5oHy_1qyjuNTfUZYFS_ZFbnuJRR3G9kc"
        />
      </Head>
      <NextSeo
        noindex={true}
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
        {/* {linksLoading ? (
          <CenterSpinner />
        ) : (

        )} */}
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
