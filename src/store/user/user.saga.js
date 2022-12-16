import { takeLatest, all, call, put } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import {
  signUpSuccess,
  signUpFailed,
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
} from './user.action';

import {
  signOutUser,
  getCurrentUser,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

// This function is being used in all the sagas
/******************************************************/
function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInformation
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// User Session
/******************************************************/
function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// Sign Up
/******************************************************/
function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Cannot create user, email already in use');
    }
    yield put(signUpFailed(error));
  }
}

function* signInAfterSignUp({ payload: { user, additionalInformation } }) {
  try {
    yield call(getSnapshotFromUserAuth, user, additionalInformation);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// Sign In
/******************************************************/
function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    switch (error.code) {
      case 'auth/wrong-password':
        alert('Incorrect password for email');
        break;
      case 'auth/user-not-found':
        alert('No user associated with this email');
        break;
      default:
        console.log(error);
    }
    yield put(signInFailed(error));
  }
}

// Sign Out
/******************************************************/
function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

// Sagas
/******************************************************/
function* onCheckUserASession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

// Accumulator
/******************************************************/
export function* userSagas() {
  yield all([
    call(onCheckUserASession),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
  ]);
}
