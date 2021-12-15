import { createSelector } from 'reselect';

export const getRoot = (state) => state; //.root;

export const getVehicles = createSelector(getRoot, (state) => state.vehicleList);

export const getTags = createSelector(getRoot, (state) => state.tags);

export const getSelectedTags = createSelector(getRoot, (state) => state.selectedTags);

export const getIsLoading = createSelector(getRoot, (state) => state.isLoading);

export const getPaging = createSelector(getRoot, ({ count, total, page }) => ({
  count,
  total,
  page,
}));

export const getTotal = createSelector(getRoot, (state) => state.total);

export const getSearchValue = createSelector(getRoot, (state) => state.searchValue);

export const getCurrentPage = createSelector(getRoot, (state) => state.page);

export const getStates = createSelector(getRoot, (state) => state.states);

export const getCities = createSelector(getRoot, (state) => state.cities);

export const getSelectedVehicleItem = createSelector(getRoot, (state) => state.selectedVehicleItem);

export const getAnchor = createSelector(getRoot, (state) => state.scrollAnchor);
