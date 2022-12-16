import { takeLatest, all, call, put } from 'redux-saga/effects';

import { CATEGORIES_ACTION_TYPES } from './category.types';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category.action';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
