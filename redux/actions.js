import {
  PERFORM_SEARCH,
  PERFORM_SEARCH_SUCCESS,
  PERFORM_SEARCH_FAIL,
  CHANGE_RESULT_PAGE,
  SELECT_VEHICLE_SUCCESS,
  SELECT_VEHICLE_FAIL,
  TOTAL_COUNT,
  CHANGE_SEARCH_VALUE,
  SHOW_LOADER,
  HIDE_LOADER,
  GET_TAGS_SUCCESS,
  GET_TAGS,
  GET_TAGS_FAIL,
  REMOVE_TAG,
  ADD_TAG,
  CLEAR_SEARCH,
  VALIDATE_TAGS,
  SET_LAT,
  SET_LON,
  LIKE_SUCCESS,
  DISLIKE_SUCCESS,
  GET_LIKED_VEHICLES_SUCCESS,
  GET_DISLIKED_VEHICLES_SUCCESS,
  GET_STATES_SUCCESS,
  GET_CITIES_SUCCESS,
  SET_ANCHOR,
} from "./actionTypes";
import VehicleModel from "../models/vehicle.model";
import http from "../services/api";
import Analytics from "../Analytics";

const ITEMS_PER_PAGE = 8;

export const performSearchAction = (payload) => {
  return async (dispatch) => {
    const startTimeInMs = Date.now();
    const { value, page, router, tags, get_lat, get_lon } = payload;

    if (router) {
      const link =
        "/search-result?q=" +
        value.trim() +
        "&page=" +
        page +
        "&tags=" +
        (tags || "") +
        "&lat=" +
        (get_lat || "") +
        "&lon=" +
        (get_lon || "");

      // must refactor this
      // `${window.location.pathname}${window.location.search}` !== link &&
      //   router.push(link);
      router.push(link);
    }
    dispatch(showLoader());
    try {
      const promises = [
        http.get("/api/search", {
          params: {
            q: value.trim(),
            page: page || 1,
            tags: tags ? tags + "" : "",
            lat: get_lat || "",
            lon: get_lon || "",
          },
        }),
      ];

      const [searchResults] = await Promise.all(promises);
      const responseTime = Date.now() - startTimeInMs;
      Analytics.logResponseTime({
        eventType: "/search-result",
        message: responseTime.toString(),
      });
      const { data } = searchResults;
      const state = {
        vehicleList: data.results.map((item) => new VehicleModel(item)),
        total: Math.ceil(data.totalCount / ITEMS_PER_PAGE),
        searchValue: value,
        page: data.page,
        tags: data.tagList,
        allTags: data.tagList,
      };

      dispatch(performSearchSuccessAction(state));
      dispatch(validateTags(state.searchValue));
    } catch (e) {
      console.error(e);
      Analytics.logError({ message: e.message });
      dispatch(performSearchFailAction(e));
    }
  };
};

export const setLon = (payload) => ({
  type: SET_LON,
  payload,
});

export const setLat = (payload) => ({
  type: SET_LAT,
  payload,
});

export const runSearchAction = (payload) => {
  return performSearchAction.call(this, payload, false);
};

export const setSearchValueAction = (payload) => ({
  type: PERFORM_SEARCH,
  payload,
});

export const clearSearchAction = () => ({
  type: CLEAR_SEARCH,
});

export const changeSearchValueAction = (payload) => ({
  type: CHANGE_SEARCH_VALUE,
  payload,
});
export const performSearchSuccessAction = (payload) => ({
  type: PERFORM_SEARCH_SUCCESS,
  payload,
});

export const performSearchFailAction = (payload) => ({
  type: PERFORM_SEARCH_FAIL,
  payload,
});

export const changeResultPageAction = (payload) => ({
  type: CHANGE_RESULT_PAGE,
  payload,
});

export const totalCountOfPagesAction = (payload) => ({
  type: TOTAL_COUNT,
  payload,
});

export const selectVehicleAction = (id) => {
  return async (dispatch) => {
    const startTimeInMs = Date.now();
    try {
      const { data } = await http.get(`/api/vehicle/${id}`);
      const responseTime = Date.now() - startTimeInMs;
      Analytics.logResponseTime({
        eventType: "/api/vehicle",
        message: responseTime.toString(),
      });
      dispatch(selectVehicleSuccessAction(new VehicleModel(data)));
    } catch (e) {
      Analytics.logError({ message: e.message });
      dispatch(selectVehicleFailAction(e));
    }
  };
};

export const selectVehicleSuccessAction = (payload) => ({
  type: SELECT_VEHICLE_SUCCESS,
  payload,
});

export const selectVehicleFailAction = (payload) => ({
  type: SELECT_VEHICLE_FAIL,
  payload,
});

export const showLoader = () => ({
  type: SHOW_LOADER,
});

export const hideLoader = () => ({
  type: HIDE_LOADER,
});

export const getTags = (payload) => ({
  type: GET_TAGS,
  payload,
});

export const getTagsSuccess = (payload) => ({
  type: GET_TAGS_SUCCESS,
  payload,
});

export const getTagsFail = (payload) => ({
  type: GET_TAGS_FAIL,
  payload,
});

export const addTag = (payload) => ({
  type: ADD_TAG,
  payload,
});

export const setAnchor = (payload) => ({
  type: SET_ANCHOR,
  payload,
});

export const removeTag = (payload) => ({
  type: REMOVE_TAG,
  payload,
});

export const validateTags = (payload) => ({
  type: VALIDATE_TAGS,
  payload,
});

export const likeAction = (vehicleId) => {
  return async (dispatch) => {
    const startTimeInMs = Date.now();
    try {
      const result = await http.get(`/api/like-vehicle/${vehicleId}`);
      const responseTime = Date.now() - startTimeInMs;
      Analytics.logResponseTime({
        eventType: "/api/like-vehicle",
        message: responseTime.toString(),
      });
      dispatch({ type: LIKE_SUCCESS, payload: { result } });
    } catch (e) {
      Analytics.logError({ message: e.message });
      //TODO show the error message
    }
  };
};

export const disLikeAction = (vehicleId) => {
  return async (dispatch) => {
    const startTimeInMs = Date.now();
    try {
      const result = await http.get(`/api/dislike-vehicle/${vehicleId}`);
      dispatch({ type: DISLIKE_SUCCESS, payload: { result } });
      const responseTime = Date.now() - startTimeInMs;
      Analytics.logResponseTime({
        eventType: "/api/dislike-vehicle",
        message: responseTime.toString(),
      });
    } catch (e) {
      Analytics.logError({ message: e.message });
      //TODO show the error message
    }
  };
};

export const getLikedVehiclesAction = (page = 1, pageSize) => {
  return async (dispatch) => {
    const startTimeInMs = Date.now();
    try {
      dispatch(showLoader());
      const { data } = await http.get(`/api/my-liked-vehicles`, {
        params: {
          page,
          pageSize,
        },
      });
      const responseTime = Date.now() - startTimeInMs;
      Analytics.logResponseTime({
        eventType: "/api/my-liked-vehicles",
        message: responseTime.toString(),
      });
      const vehicleList = data?.results?.map((item) => new VehicleModel(item));
      const payload = {
        page: data?.page,
        total: data?.totalCount,
        vehicleList,
      };
      dispatch({ type: GET_LIKED_VEHICLES_SUCCESS, payload });
      dispatch(hideLoader());
    } catch (e) {
      Analytics.logError({ message: e.message });
      dispatch(hideLoader());
      //TODO show the error message
    }
  };
};

export const getDislikedVehiclesAction = (page = 1, pageSize) => {
  return async (dispatch) => {
    const startTimeInMs = Date.now();
    try {
      dispatch(showLoader());
      const { data } = await http.get(`/api/my-disliked-vehicles`, {
        params: {
          page,
          pageSize,
        },
      });
      const responseTime = Date.now() - startTimeInMs;
      Analytics.logResponseTime({
        eventType: "/api/my-disliked-vehicles",
        message: responseTime.toString(),
      });
      const vehicleList = data?.results?.map((item) => new VehicleModel(item));
      const payload = {
        page: data?.page,
        total: data?.totalCount,
        vehicleList,
      };
      dispatch({ type: GET_DISLIKED_VEHICLES_SUCCESS, payload });
      dispatch(hideLoader());
    } catch (e) {
      Analytics.logError({ message: e.message });
      dispatch(hideLoader());
      //TODO show the error message
    }
  };
};

export const selectStatesAction = () => {
  return async (dispatch) => {
    const startTimeInMs = Date.now();
    try {
      const { data } = await http.get("/api/credit/state");
      const payload = {
        states: data,
      };
      dispatch({ type: GET_STATES_SUCCESS, payload });
      const responseTime = Date.now() - startTimeInMs;
      Analytics.logResponseTime({
        eventType: "/api/credit/state",
        message: responseTime.toString(),
      });
    } catch (e) {
      Analytics.logError({ message: e.message });
    }
  };
};
export const selectCitiesAction = (id) => {
  return async (dispatch) => {
    const startTimeInMs = Date.now();
    try {
      const { data } = await http.get(`/api/credit/city/${id}`);
      const payload = {
        cities: data,
      };
      dispatch({ type: GET_CITIES_SUCCESS, payload });
      const resTime = Date.now() - startTimeInMs;
      Analytics.logResponseTime({
        eventType: "/api/credit/city",
        message: resTime.toString(),
      });
    } catch (e) {
      Analytics.logError({ message: e.message });
    }
  };
};
export const selectReviews = (locationId, type, page, filter) => {
  let endpoint = `/api/review/${type}`;

  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const { data } = await http.get(endpoint, {
        params: {
          locationId,
          page,
          filter,
        },
      });
      dispatch(hideLoader());
      return data;
    } catch (e) {
      Analytics.logError({ message: e.message });
    }
  };
};
