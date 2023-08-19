// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, updatePassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, onSnapshot, doc, query, orderBy, where, updateDoc, deleteField, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";


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


// Initialize Firebase app and auth
// ...

// Get the form and reset message elements



const resetForm = document.getElementById("changePassword");
const resetMessage = document.getElementById("reset-message");

let passwordResetFunction = (event) => {
    event.target.parentNode.innerHTML = `
    

    <input type="password" required placeholder="New Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
    <input type="password" required placeholder="Confirm Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
    <button id="pwdReset" class="update">Reset</button>
    
    `
  
}

resetForm.addEventListener("click", passwordResetFunction);



let nameChange = document.getElementById("NameChange")
let nameChangeFunction = (event) => {
    event.target.parentNode.innerHTML = `
    

    <input type="text"  pattern=".{3,20}" required placeholder="First Name" title="Must be between 3 and 20 characters">
    <input type="text"  pattern=".{1,20}" required placeholder="Last Name" title="Must be between 1 and 20 characters">
    <button id="nameReset" class="saveName">Reset</button>
    
    `
  
}

nameChange.addEventListener("click", nameChangeFunction);






onAuthStateChanged(auth, (user) => {

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
    //   location.href = './index.html';
      // ...
      console.log(user.email)
      const userEmail = user.email;
      
document.addEventListener('click',async (event) => {
    if (event.target.classList.contains('update')) {

        console.log(event.target.parentNode)

        const inputFields = event.target.parentNode.querySelectorAll('input');

        console.log(inputFields)
        const newPassword = inputFields[0].value
        const confirmPassword = inputFields[1].value
        if (newPassword === confirmPassword) {


            try {
                // const userCredential = await signInWithEmailAndPassword(auth, email, "currentPassword");
                // const user = userCredential.user;
                await updatePassword(user, newPassword);
                resetMessage.textContent = "Password reset successfully.";
              } catch (error) {
                resetMessage.textContent = "An error occurred. Please logout and login again to reset.";
                console.error("Error resetting password:", error);
              }



        }

    }


    if(event.target.classList.contains('saveName')){


        const inputFields = event.target.parentNode.querySelectorAll('input');

        const firstName = inputFields[0].value
        const lastName = inputFields[1].value

        const querySnapshot = await getDocs(collection(db, "Users"));
         querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        if(doc.data().useremail === userEmail){


        console.log(doc.data().firstname)
        

      }
    });





    }

    //////////////////

  
/////////////


localStorage.setItem('userEmail', userEmail);

if(event.target.classList.contains('saveName')){
    
    
    const inputFields = event.target.parentNode.querySelectorAll('input');

    const firstName = inputFields[0].value
    const lastName = inputFields[1].value
    console.log(firstName + lastName)

    const querySnapshot = await getDocs(collection(db, "Users"));
     querySnapshot.forEach(async (dot) => {
    console.log(`${dot.id} => ${dot.data()}`);
    if(dot.data().useremail === userEmail){


        const docRef = doc(db, 'Users', dot.id);
        await updateDoc(docRef, {
          firstname: firstName,
          lastname: lastName
        });
    console.log("Done")
    location.reload();

  }
});

}

console.log(user.email);




})


    } else {
      // User is signed out
      // ...

      console.log("User is signed out")
      location.href = './index.html';

    }
  });

  let namefunct = async ()=>{
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      if(doc.data().useremail === localStorage.getItem('userEmail')){


        console.log(doc.data().firstname)
        document.getElementById("myName").innerHTML = doc.data().firstname + " " + doc.data().lastname;

      }
    });


    }

    namefunct()




    const signOutUser = async () => {
        try {
          await signOut(auth);
          console.log("User signed out");
          window.location.href = `./login.html`;
        } catch (error) {
          console.error("Error signing out user", error);
        }
      };


    document.getElementById("SignOut").addEventListener('click', signOutUser);
