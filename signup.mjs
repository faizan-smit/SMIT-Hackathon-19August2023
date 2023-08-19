
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
  import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, doc, query, orderBy, where, updateDoc, deleteField, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";


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
  const db = getFirestore(app);


  let signup = document.getElementById("signup-submit")
  
        signup.addEventListener('submit', async (event) => {

    event.preventDefault();

    
    let email = document.getElementById("email-signup").value
    let password = document.getElementById("password-signup").value
    let firstname = document.getElementById("firstname").value
    let lastname = document.getElementById("lastname").value
    let repeatpassword = document.getElementById("repeat-password-signup").value

    if(password === repeatpassword){



      try {
        const docRef = await addDoc(collection(db, "Users"), {

            useremail: email,
            firstname: firstname,
            lastname: lastname,
            timestamp: serverTimestamp(),
          
        });


        /////////////////

    
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          console.log("done signing up");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
          alert("Error please check console logs")
        });

        /////////////////
        
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    
       }else{
    
              document.getElementById("errorButton").click();
    
    
            }

    ///////////////




})







  /////////////////////////////////////////////////////////////

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


