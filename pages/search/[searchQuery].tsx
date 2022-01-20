import React from "react";
import type { NextPage } from "next";
import client from "utils/client";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { NextSeo } from "next-seo";
import CenterSpinner from "components/shared/CenterSpinner/CenterSpinner";
import Footer from "components/Footer";
import { Pagination } from "antd";
import useGeolocation from "react-hook-geolocation";
import CarInfo from "components/CarInfo";
import SearchArea from "components/SearchArea";
import style from "../../old_pages/styles/SearchResults.module.css";
import {
  changeResultPageAction,
  setSearchValueAction,
  addTag,
  removeTag,
  clearSearchAction,
} from "redux/actions";
import { getSearchValue, getSelectedTags } from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import Header from "components/shared/Header";

type PageType = string | number | undefined;

const querySearch = (searchQuery: string, page?: PageType) => async () => {
  let finalQuery = searchQuery;
  if (searchQuery && searchQuery.indexOf("-") >= 0) {
    finalQuery = searchQuery.split("-").join(" ");
  }

  try {
    const response = await client.get("/api/search", {
      params: {
        q: finalQuery,
        page: page || 1,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const Search: NextPage = () => {
  const dispatch = useDispatch();

  const searchValue = useSelector(getSearchValue);
  const selectedTags = useSelector(getSelectedTags);
  const tags = useSelector((state: any) => state.tags);

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

  React.useEffect(() => {
    dispatch(clearSearchAction());
  }, []);

  const router = useRouter();
  const searchQuery = router.query.searchQuery as string;
  const page = router.query.page as string;

  const { data, isLoading } = useQuery(
    [searchQuery, page],
    querySearch(searchQuery, page)
  );

  const results = data?.results;
  const pageSize = data?.pageSize;
  const totalCount = data?.totalCount;
  const getPageVal = () => (page ? parseInt(page) : 1);

  const onPageChange = (pageNum: number) => {
    router.push(`/search/${searchQuery}?page=${pageNum}`);
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
      <NextSeo
        title="Auto Sweet Autos"
        description="Search for Cars using AutoSweet"
        canonical={`https://dev-autosweet.azurewebsites.net/search/${searchValue}`}
        openGraph={{
          type: "website",
          url: `https://dev-autosweet.azurewebsites.net/search/${searchValue}`,
          site_name: "Auto Sweet Autos",
          description: "Automotive Marketing Agency for Dealerships",
          images: [
            {
              url: "/assets/img/icons/AutosweetAUTOS_Final-1png-03.png",
              width: 400,
              height: 300,
              alt: "AutoSweet Logo",
              type: "image/png",
            },
          ],
        }}
      />
      <Header />
      <section className={style.SearchResults}>
        <header className={style.results}>
          {!isLoading && (
            <SearchArea
              onSearch={runSearch}
              searchValue={searchValue}
              onSearchChange={searchTermChange}
              onToggleTag={toggleTag}
              tags={tags}
              selectedTags={selectedTags}
              onRemoveTag={handleRemoveTag}
            />
          )}
        </header>

        {isLoading ? (
          <CenterSpinner />
        ) : (
          <>
            <article className={style.results}>
              {results?.length ? (
                results.map((data: any, index: any) => (
                  <CarInfo key={`car_info_${index}`} {...data} />
                ))
              ) : (
                <>
                  <article className="empty-results">No results</article>
                </>
              )}
            </article>
            <footer className={style.pagination}>
              <Pagination
                current={getPageVal()}
                defaultCurrent={1}
                pageSize={pageSize}
                onChange={onPageChange}
                total={totalCount}
                showSizeChanger={false}
                responsive
              />
            </footer>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Search;
