import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyDF1XSCMFLIDNwmQxKbfO2a7nNJVDoE8xk",
  authDomain: "users-bc8db.firebaseapp.com",
  databaseURL: "https://users-bc8db.firebaseio.com",
  projectId: "users-bc8db",
  storageBucket: "users-bc8db.appspot.com",
  messagingSenderId: "208075187275",
  appId: "1:208075187275:web:8bc2615ff267495bb3d9ce",
  measurementId: "G-P50V9VL8EJ",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}

export default new Firebase();
