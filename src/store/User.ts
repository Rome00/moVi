import { auth, db } from '@/firebase';
import { logIn, user, UserData } from '@/interfaces/User';
// import firebase FirebaseError as types
import {
  AuthError,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { notify } from 'notiwind';
import { defineStore } from 'pinia';

function authError(param: unknown): param is AuthError {
  return !!(param as AuthError)?.message;
}

function getRefinedFirebaseAuthErrorMessage(errorMesssage: string): string {
  return errorMesssage.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, '');
}

export const useUserStore = defineStore('user store', {
  state: () =>
    ({
      user: {},
      isAuthenticated: false,
    } as UserData),
  getters: {},
  actions: {
    async register(userData: user) {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        const newUser = await updateProfile(auth.currentUser, {
          displayName: userData.userName,
        });
        console.log(newUser, auth.currentUser);

        this.user.userInfo = auth.currentUser;
        notify(
          {
            group: 'notify',
            title: 'success',
            text: 'User created',
          },
          4000
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
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result);
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
    async googleLogin() {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        this.user.userInfo = result.user;
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
    async authListener() {
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            this.user.userInfo = user;
            const querySnapshot = await getDocs(collection(db, 'users'));
            console.log(db);
          }
        });
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
    async logout() {},
  },
});
