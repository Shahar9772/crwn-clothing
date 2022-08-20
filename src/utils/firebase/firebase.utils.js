import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAgsxTfsEFig0SLvXOmTdGVeCBgBHCRTCU',
  authDomain: 'crwn-clothing-db-434e0.firebaseapp.com',
  projectId: 'crwn-clothing-db-434e0',
  storageBucket: 'crwn-clothing-db-434e0.appspot.com',
  messagingSenderId: '993875463692',
  appId: '1:993875463692:web:505fafbc3ae80435a6a829',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
};
