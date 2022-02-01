import { NextPageContext, NextPage } from "next";
import React from "react";
import client from "utils/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "react-query";
import { NextSeo } from "next-seo";
import CenterSpinner from "components/shared/CenterSpinner/CenterSpinner";
import Footer from "components/Footer";
import { Pagination } from "antd";
import useGeolocation from "react-hook-geolocation";
import CarInfo from "components/CarInfo";
import SearchArea from "components/SearchArea";
import style from "../../old_pages/styles/SearchResults.module.css";
import { chakra as c } from "@chakra-ui/react";
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
import { Icon } from "@chakra-ui/react";
import { AiFillBackward, AiFillForward } from "react-icons/ai";

type PageType = string | number | undefined;

type Props = {
  searchQuery: string;
};

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

const Search: NextPage<Props> = (props: Props) => {
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

  const searchQuery = props.searchQuery;

  const router = useRouter();
  // const searchQuery = router.query.searchQuery as string;
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
        canonical={`https://dev-autosweet.azurewebsites.net/search/${searchQuery}`}
        openGraph={{
          type: "website",
          url: `https://dev-autosweet.azurewebsites.net/search/${searchQuery}`,
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
          <c.div h="80vh">
            <CenterSpinner />
          </c.div>
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
                // simple
                itemRender={(pageNum, pageNumType) => {
                  if (pageNumType === "jump-prev")
                    return (
                      <Link href={`/search/${searchQuery}?page=${pageNum}`}>
                        <a>
                          {" "}
                          <Icon as={AiFillBackward} />
                        </a>
                      </Link>
                    );
                  if (pageNumType === "jump-next")
                    return (
                      <Link href={`/search/${searchQuery}?page=${pageNum}`}>
                        <a>
                          <Icon as={AiFillForward} />
                        </a>
                      </Link>
                    );
                  if (pageNumType === "prev")
                    return (
                      <Link href={`/search/${searchQuery}?page=${pageNum}`}>
                        <a>prev</a>
                      </Link>
                    );
                  if (pageNumType === "next")
                    return (
                      <Link href={`/search/${searchQuery}?page=${pageNum}`}>
                        <a>next</a>
                      </Link>
                    );

                  return (
                    <Link href={`/search/${searchQuery}?page=${pageNum}`}>
                      <a>{pageNum}</a>
                    </Link>
                  );
                }}
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

export async function getServerSideProps(ctx: NextPageContext) {
  const searchQuery = ctx?.query?.searchQuery;

  return {
    props: {
      searchQuery,
    },
  };
}
