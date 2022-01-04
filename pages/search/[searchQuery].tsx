import React from "react";
import type { NextPage } from "next";
// import SearchResultsPage from "../old_pages/SearchResults";
import client from "utils/client";
import { Box, Input } from "@chakra-ui/react";
import Navigation from "components/Navigation";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import CenterSpinner from "components/shared/CenterSpinner/CenterSpinner";
import Footer from "components/Footer";
import { Pagination } from "antd";
import Logo from "public/assets/img/icons/AutosweetAUTOS_Final-1png-03.png";
import CarInfo from "components/CarInfo";
import SearchArea from "components/SearchArea";
import style from "../../old_pages/styles/SearchResults.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  changeResultPageAction,
  setSearchValueAction,
  addTag,
  removeTag,
  clearSearchAction,
} from "redux/actions";
import isBrowser from "utils/isBrowser";
import { getSearchValue, getSelectedTags } from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";

type PageType = string | number | undefined;

const querySearch = (searchQuery: string, page?: PageType) => async () => {
  try {
    const response = await client.get("/api/search", {
      params: {
        q: searchQuery,
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

  const [lat, setLat] = React.useState(0);
  const [lon, setLon] = React.useState(0);

  const runSearch = (value: string) => {
    // changeResultPageAction(1);
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

  const isOnBrowser = isBrowser();

  React.useEffect(() => {
    if (navigator.geolocation && isBrowser()) {
      navigator.geolocation.getCurrentPosition(function (position: any) {
        if (position.coords.latitude) {
          setLat(position.coords.latitude.toString().slice(0, 11));
          setLon(position.coords.longitude.toString().slice(0, 11));
        }
      });
    }
  }, [isOnBrowser]);

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
      <header className={style.Header}>
        <Link href="/">
          <Image src={Logo} alt="logo" className={style.logo} />
        </Link>
        <Navigation />
      </header>
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
            <article>
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

// LEAVE TEMPORARILY CHECK IF REQUIREMENT FOR Fetching on server is required
// export async function getServerSideProps(context: any) {
//   const queryParams = context.query;
//   console.log({ queryParams });

//   const { searchQuery = "", page = 1, tags, lat, lon } = queryParams;
//   const response = await client.get("api/search", {
//     params: {
//       q: searchQuery,
//       page,
//       tags,
//       lat,
//       lon,
//     },
//   });

//   const data = response?.data;

//   return {
//     props: {
//       data,
//     }, // will be passed to the page component as props
//   };
// }
