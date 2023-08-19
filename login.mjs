
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxIaA_SeDtaCY0SE81P37AC3NHLFdxN58",

    authDomain: "my-hackathon-saylani.firebaseapp.com",

    projectId: "my-hackathon-saylani",

    storageBucket: "my-hackathon-saylani.appspot.com",

    messagingSenderId: "942264088421",

    appId: "1:942264088421:web:43faf1a0e13848dddc538c"

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


document.getElementById("signin-submit").addEventListener('submit', (event) => {

    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value
    


    //////////////


        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("signInWithEmailAndPassword");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          alert("Error please check console logs")
        });


        /////////////////
        




})



////////////////////////////////////////////////////////////////////

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      location.href = './index.html';
      // ...
    } else {
      // User is signed out
      // ...
    }
  });