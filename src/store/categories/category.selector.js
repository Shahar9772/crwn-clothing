import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => {
  console.log('selector 1 fired');
  return state.categories;
};

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlicer) => {
    console.log('selector 2 fired');
    return categoriesSlicer.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log('categoriesMap selector fired');
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
