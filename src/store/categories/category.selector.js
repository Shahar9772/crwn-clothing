import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => {
  return state.categories;
};

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlicer) => {
    return categoriesSlicer.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlicer) => categoriesSlicer.isLoading
);
