import type { NextPage } from "next";
import SearchResultsPage from "../old_pages/SearchResults";
import client from "utils/client";

export async function getServerSideProps(context: any) {
  const queryParams = context.query;

  const { q, page, tags, lat, lon } = queryParams;
  const response = await client.get("api/search", {
    params: {
      q,
      page,
      tags,
      lat,
      lon,
    },
  });

  const data = response?.data;

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

const SearchResults: NextPage = (props) => {
  return <SearchResultsPage ssrProps={props} />;
};

export default SearchResults;
