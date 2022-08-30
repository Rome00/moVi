import { auth, db } from '@/firebase';
import { logIn, user, UserData } from '@/interfaces/User';
import router from '@/router';
// import firebase FirebaseError as types
import {
  AuthError,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { notify } from 'notiwind';
import { defineStore } from 'pinia';

function authError(param: unknown): param is AuthError {
  return !!(param as AuthError)?.message;
}

function getRefinedFirebaseAuthErrorMessage(errorMesssage: string): string {
  return errorMesssage.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, '');
}

export const useUserStore = defineStore('userStore', {
  state: () =>
    ({
      user: {
        userInfo: null,
        fav_movies: null,
      },
      isAuthenticated: false,
    } as UserData),
  getters: {},
  actions: {
    async register(userData: user) {
      try {
        await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        await updateProfile(auth.currentUser, {
          displayName: userData.userName,
        });
        const user = auth.currentUser;
        this.user.userInfo = user;
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { fav_movies: [] });
        this.user.userInfo = user;
        this.isAuthenticated = true;
        notify(
          {
            group: 'notify',
            title: 'success',
            text: 'User created successfully',
          },
          2000
        ); // 4s
      } catch (error) {
        if (authError(error)) {
          notify(
            {
              group: 'notify',
              title: 'error',
              text: getRefinedFirebaseAuthErrorMessage(error.message),
            },
            4000
          ); // 4s
        }
      }
    },

    async login(details: logIn) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        this.user.userInfo = user;
        const userRef = doc(db, 'users', user.uid);
        const userFavorites = await getDoc(userRef);
        if (userFavorites) {
          this.user.fav_movies = userFavorites.data;
        }
        this.isAuthenticated = true;
        router.push({ name: 'movie' });
        notify(
          {
            group: 'notify',
            title: 'success',
            text: 'Logged in successfully',
          },
          2000
        ); // 4s
      } catch (error) {
        if (authError(error)) {
          notify(
            {
              group: 'notify',
              title: 'error',
              text: getRefinedFirebaseAuthErrorMessage(error.message),
            },
            4000
          ); // 4s
        }
      }
    },
    async addFavItem(data) {
      try {
        const docRef = await setDoc(doc(db, 'users', this.user.userInfo.uid), {
          fav_movies: [],
        });
      } catch (error) {}
    },
    async googleLogin() {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const userRef = doc(db, 'users', result.user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          this.user.fav_movies = docSnap.data().fav_movies;
          console.log('Document data:', docSnap.data());
        } else {
          await setDoc(userRef, { fav_movies: [] });
          console.log('No such document!');
        }
        this.user.userInfo = result.user;
        this.isAuthenticated = true;
        router.push({ name: 'movie' });
      } catch (error) {
        if (authError(error)) {
          console.log(error);

          notify(
            {
              group: 'notify',
              title: 'error',
              text: getRefinedFirebaseAuthErrorMessage(error.message),
            },
            4000
          ); // 4s
        }
      }
    },
    async fetchUser() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user.userInfo = user;
          this.isAuthenticated = true;
          if (router.isReady() && router.currentRoute.value.name === 'auth') {
            router.push('movie');
          }
        } else {
          this.user.userInfo = null;
          this.isAuthenticated = false;
        }
      });
    },
    async logout() {
      try {
        await signOut(auth);
        this.user.userInfo = null;
        this.isAuthenticated = false;
        notify(
          {
            group: 'notify',
            title: 'success',
            text: 'Logged out successfully',
          },
          2000
        ); // 4s
      } catch (error) {
        if (authError(error)) {
          notify(
            {
              group: 'notify',
              title: 'error',
              text: getRefinedFirebaseAuthErrorMessage(error.message),
            },
            4000
          ); // 4s
        }
      }
    },
  },
});
