import VehicleModel from "../models/vehicle.model";
import {
  CHANGE_RESULT_PAGE,
  PERFORM_SEARCH,
  PERFORM_SEARCH_SUCCESS,
  PERFORM_SEARCH_FAIL,
  SELECT_VEHICLE_SUCCESS,
  TOTAL_COUNT,
  GET_TAGS_SUCCESS,
  ADD_TAG,
  REMOVE_TAG,
  HIDE_LOADER,
  SHOW_LOADER,
  CLEAR_SEARCH,
  VALIDATE_TAGS,
  SET_LAT,
  SET_LON,
  LIKE_SUCCESS,
  DISLIKE_SUCCESS,
  GET_LIKED_VEHICLES_SUCCESS,
  GET_DISLIKED_VEHICLES_SUCCESS,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_STATES,
  GET_STATES_SUCCESS,
  SET_ANCHOR,
} from "./actionTypes";

const initialState = {
  searchValue: "",
  vehicleList: [],
  selectedTags: [],
  tags: [],
  page: 1,
  count: 0,
  total: 0,
  selectedVehicleItem: new VehicleModel(),
  isLoading: false,
  scrollAnchor: false,
  isTags: false,
  lat: "",
  lon: "",
  states: [],
  cities: [],
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAT:
      return { ...state, lat: action.payload };

    case SET_LON:
      return { ...state, lon: action.payload };

    case HIDE_LOADER:
      return { ...state, isLoading: false };

    case SHOW_LOADER:
      return { ...state, isLoading: true };

    case GET_TAGS_SUCCESS:
      return { ...state, tags: action.payload, isLoading: false };

    case LIKE_SUCCESS: {
      return {
        ...state,
        selectedVehicleItem: {
          ...state.selectedVehicleItem,
          liked: !state.selectedVehicleItem.liked,
          disliked: !state.selectedVehicleItem.liked
            ? false
            : state.selectedVehicleItem.disliked,
        },
        isLoading: false,
      };
    }

    case DISLIKE_SUCCESS: {
      return {
        ...state,
        selectedVehicleItem: {
          ...state.selectedVehicleItem,
          disliked: !state.selectedVehicleItem.disliked,
          liked: !state.selectedVehicleItem.disliked
            ? false
            : state.selectedVehicleItem.liked,
        },
        isLoading: false,
      };
    }

    case GET_LIKED_VEHICLES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    }

    case GET_DISLIKED_VEHICLES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    }

    case PERFORM_SEARCH:
      return { ...state, searchValue: action.payload };

    case PERFORM_SEARCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case SET_ANCHOR:
      return { ...state, scrollAnchor: action.payload };

    case PERFORM_SEARCH_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case SELECT_VEHICLE_SUCCESS:
      return { ...state, selectedVehicleItem: action.payload };

    case CHANGE_RESULT_PAGE:
      return { ...state, page: action.payload };

    case CLEAR_SEARCH:
      return {
        ...state,
        searchValue: "",
        page: 1,
        tags: [...state.tags, ...state.selectedTags],
        selectedTags: [],
      };

    case TOTAL_COUNT:
      return { ...state, total: action.payload };

    case ADD_TAG:
      const tags = [...state.tags];
      const index = tags.findIndex((v) => v === action.payload);
      index >= 0 && tags.splice(index, 1);
      return {
        ...state,
        selectedTags: [...state.selectedTags, action.payload],
        tags,
        searchValue: state.searchValue.trim() + " " + action.payload,
        page: 1,
      };

    case REMOVE_TAG:
      const { isSelected, tag } = action.payload;
      if (state.searchValue.toLowerCase().includes(tag.toLowerCase())) {
        const dataSetName = isSelected ? "selectedTags" : "tags";
        const reverseDataSetName = !isSelected ? "selectedTags" : "tags";
        const st = [...state[dataSetName]];
        const i = st.findIndex((v) => v === tag);
        i >= 0 && st.splice(i, 1);
        const newState = {
          ...state,
          [dataSetName]: st,
          searchValue: state.searchValue
            .toLowerCase()
            .replace(tag.toLowerCase(), "")
            .trim(),
          page: 1,
        };
        if (reverseDataSetName !== "selectedTags") {
          newState[reverseDataSetName] = [...state[reverseDataSetName], tag];
        }
        return newState;
      } else {
        return state;
      }
    case VALIDATE_TAGS:
      let a = action.payload;
      let t = state.allTags;
      let st = [];

      console.log({ st, a, t });

      t?.forEach((element) => {
        if (a.toLowerCase().includes(element.toLowerCase())) {
          st.push(element);
        }
      });

      st.forEach((el, i) => {
        for (let idx = 0; idx < t.length; idx++) {
          if (el.toLowerCase().includes(t[idx].toLowerCase())) {
            if (el.toLowerCase() !== t[idx].toLowerCase()) {
              st = st.filter((item) => item !== t[idx]);
            }
          }
        }
      });

      let newTags = state.tags;
      if (st.length !== 0) {
        st.forEach(
          (element) => (newTags = newTags.filter((i) => i !== element))
        );
      }

      return {
        ...state,
        selectedTags: st,
        tags: newTags,
      };

    case GET_STATES:
      return { ...state, states: action.payload };

    case GET_STATES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_CITIES:
      return { ...state, cities: action.payload };

    case GET_CITIES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
export default main;
