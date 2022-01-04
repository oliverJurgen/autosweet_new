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
import style from "../../old_pages/styles/SearchResults.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

type PageType = string | number | undefined;

const querySearch = (searchQuery: string, page?: PageType) => async () => {
  // console.log({ searchQuery, page });

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
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const searchQuery = router.query.searchQuery as string;
  const page = router.query.page as string;

  const { data, isLoading } = useQuery(
    [searchQuery, page],
    querySearch(searchQuery, page)
  );

  console.log({ data, isLoading, page });

  // if (isLoading) return <CenterSpinner />;

  const results = data?.results;
  // const page = data?.page;
  const pageSize = data?.pageSize;
  const totalCount = data?.totalCount;
  const getPageVal = () => (page ? parseInt(page) : 1);

  const onPageChange = (pageNum: number) => {
    router.push(`/search/${searchQuery}?page=${pageNum}`);
  };

  console.log({ results, data });

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
          {/* REIMPLEMENT SEARCH FUNCTIONALITY - Decouple from Redux */}
          {/* <SearchArea
            onSearch={this.runSearch}
            searchValue={searchValue}
            onSearchChange={this.searchTermChange}
            onToggleTag={this.toggleTag}
            tags={tags}
            selectedTags={selectedTags}
            onRemoveTag={this.removeTag}
          /> */}
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
        {/* {results?.length && isLoading ? (
          <>
            <article className={style.results}>
              {!isLoading ? (
                results.map((data: any, index: any) => (
                  <CarInfo key={`car_info_${index}`} {...data} />
                ))
              ) : (
                <CenterSpinner />
              )}
            </article>
            <footer className={style.pagination}>
              <Pagination
                current={parseInt(page)}
                defaultCurrent={1}
                pageSize={pageSize}
                onChange={onPageChange}
                total={totalCount}
                responsive
              />
            </footer>
          </>
        ) : (
          <article className="empty-results">No results</article>
        )} */}
      </section>
      <Footer />
    </>
  );
};

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

export default Search;
