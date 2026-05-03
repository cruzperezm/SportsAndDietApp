import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  authState,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { from, Observable, map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  isLoggedIn$: Observable<boolean> = authState(this.auth).pipe(map((user) => !!user));

  register(userForm: any): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, userForm.email, userForm.password)).pipe(
      switchMap(async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(this.firestore, `users/${user.uid}`);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: userForm.username,
          createdAt: new Date(),
          needsOnboarding: true,
        });
        return { user, needsOnboarding: true };
      }),
    );
  }

  googleAuth(idToken: string): Observable<any> {
    const credential = GoogleAuthProvider.credential(idToken);
    return from(signInWithCredential(this.auth, credential)).pipe(
      switchMap(async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(this.firestore, `users/${user.uid}`);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date(),
            needsOnboarding: true,
          });
          return { user, needsOnboarding: true };
        }
        return { user, needsOnboarding: userSnap.data()['needsOnboarding'] };
      }),
    );
  }

  login(credentials: any): Observable<any> {
    return from(
      signInWithEmailAndPassword(this.auth, credentials.email, credentials.password),
    ).pipe(
      switchMap(async (userCredential) => {
        const userRef = doc(this.firestore, `users/${userCredential.user.uid}`);
        const userSnap = await getDoc(userRef);
        return {
          user: userCredential.user,
          needsOnboarding: userSnap.exists() ? userSnap.data()['needsOnboarding'] : true,
        };
      }),
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
