import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAQDMte1pqou-1UnCJofBG0ZKCJ-SGwNyo',
	authDomain: 'crwn-clothing-v2-6f7ff.firebaseapp.com',
	projectId: 'crwn-clothing-v2-6f7ff',
	storageBucket: 'crwn-clothing-v2-6f7ff.appspot.com',
	messagingSenderId: '421434298150',
	appId: '1:421434298150:web:8f5c5d1ae034d3b319bbe7'
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}
};

// if user data doesn't exist

// if user data exists, create

//return userDocRef
