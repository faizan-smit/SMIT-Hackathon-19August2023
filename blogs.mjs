import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
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

/////////////////////////


const onlyUserPosts = (event) => {

    console.log(event);
    const theUser = event.target.attributes.user.value;
    console.log(theUser);
    
    const q = query(collection(db, "Blogs"), orderBy("timestamp", "desc"));
    const showDiv = document.getElementById("blog");
    showDiv.innerHTML = "";

    let goBack = document.createElement("a");
    goBack.innerHTML = "Go Back";
    goBack.classList.add("goback");
    goBack.addEventListener("click", ()=>{
        location.reload()
    })
    document.getElementById("blog").appendChild(goBack);

    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
            if (snapshot.data().userEmail === theUser){


            const Blogs = document.getElementById("blog");
            const card = document.createElement("div");
            card.classList.add("theCard");
            const upperPart = document.createElement("div");
            upperPart.classList.add("upperPart");
            const lowerPart = document.createElement("div");
            lowerPart.classList.add("lowerPart");
            // const link = document.createElement("a");
            // link.classList.add("link");
            const upperLeft = document.createElement("div");
            upperLeft.classList.add("upperLeft");
            const upperRight = document.createElement("div");
            upperRight.classList.add("upperRight");
            const image = document.createElement("img");
            image.classList.add("image");
            const title = document.createElement("div");
            title.classList.add("title");
            const author = document.createElement("div");
            author.classList.add("author");
            const authorName = document.createElement("span");
            authorName.classList.add("authorName");
            const postTime = document.createElement("span");
            postTime.classList.add("postTime");
            // link.innerHTML = "See All Blogs From This User";
            // link.setAttribute('user', snapshot.data().userEmail);
            // link.href = "#";

            // link.addEventListener("click", onlyUserPosts)

            image.src = './users-vector-icon-png_260862.jpg';
            image.setAttribute('width', '50');
            image.setAttribute('height', '50');
            upperLeft.appendChild(image);

            title.innerHTML = snapshot.data().postTitle;
            const timestamp = snapshot.data().timestamp; // Assuming you have obtained the timestamp from the snapshot
            const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
            postTime.innerHTML = date.toLocaleString();

            // Retrieve the author's name directly from the snapshot
            const userEmail = snapshot.data().userEmail;
            const q1 = query(collection(db, "Users"), orderBy("timestamp", "desc"));
            onSnapshot(q1, (querySnapshotNew) => {
                querySnapshotNew.forEach((snapshotNew) => {
                    if (snapshotNew.data().useremail === userEmail) {
                        authorName.innerHTML = snapshotNew.data().firstname + ' ' + snapshotNew.data().lastname;
                    }
                    console.log(snapshotNew.data().firstname);
                    console.log(snapshotNew.data().lastname);
                    console.log(snapshotNew.data().useremail);
                    console.log(userEmail);

                });

                // After obtaining the author's name, build the structure
                author.appendChild(authorName);
                author.appendChild(postTime);
                upperRight.appendChild(title);
                upperRight.appendChild(author);
                upperPart.appendChild(upperLeft);
                upperPart.appendChild(upperRight);
                lowerPart.innerHTML = snapshot.data().postContent;
                card.appendChild(upperPart);
                card.appendChild(lowerPart);
                // card.appendChild(link);
                Blogs.appendChild(card);

            });


            }
            
            });
        });
    };





  


////////////////////////

  const displayFunction = () => {
    const q = query(collection(db, "Blogs"), orderBy("timestamp", "desc"));
    const showDiv = document.getElementById("blog");
    showDiv.innerHTML = "";

    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
            const Blogs = document.getElementById("blog");
            const card = document.createElement("div");
            card.classList.add("theCard");
            const upperPart = document.createElement("div");
            upperPart.classList.add("upperPart");
            upperPart.classList.add("d-flex");
            const lowerPart = document.createElement("div");
            lowerPart.classList.add("lowerPart");
            const link = document.createElement("a");
            link.classList.add("link")
            const upperLeft = document.createElement("div");
            upperLeft.classList.add("upperLeft");
            const upperRight = document.createElement("div");
            upperRight.classList.add("upperRight");
            const image = document.createElement("img");
            image.classList.add("image");
            const title = document.createElement("div");
            title.classList.add("title");
            const author = document.createElement("div");
            author.classList.add("author");
            const authorName = document.createElement("span");
            authorName.classList.add("authorName");
            const postTime = document.createElement("span");
            postTime.classList.add("postTime");
            link.innerHTML = "See All Blogs From This User";
            link.setAttribute('user', snapshot.data().userEmail);
            link.href = "#";

            link.addEventListener("click", onlyUserPosts)

            image.src = './users-vector-icon-png_260862.jpg';
            image.setAttribute('width', '50');
            image.setAttribute('height', '50');
            upperLeft.appendChild(image);

            title.innerHTML = snapshot.data().postTitle;
            const timestamp = snapshot.data().timestamp; // Assuming you have obtained the timestamp from the snapshot
            const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
            postTime.innerHTML = date.toLocaleString();

            // Retrieve the author's name directly from the snapshot
            const userEmail = snapshot.data().userEmail;
            const q1 = query(collection(db, "Users"), orderBy("timestamp", "desc"));
            onSnapshot(q1, (querySnapshotNew) => {
                querySnapshotNew.forEach((snapshotNew) => {
                    if (snapshotNew.data().useremail === userEmail) {
                        authorName.innerHTML = snapshotNew.data().firstname + ' ' + snapshotNew.data().lastname;
                    }
                    console.log(snapshotNew.data().firstname);
                    console.log(snapshotNew.data().lastname);
                    console.log(snapshotNew.data().useremail);
                    console.log(userEmail);

                });

                // After obtaining the author's name, build the structure
                author.appendChild(authorName);
                author.appendChild(postTime);
                upperRight.appendChild(title);
                upperRight.appendChild(author);
                upperPart.appendChild(upperLeft);
                upperPart.appendChild(upperRight);
                lowerPart.innerHTML = snapshot.data().postContent;
                card.appendChild(upperPart);
                card.appendChild(lowerPart);
                card.appendChild(link);
                Blogs.appendChild(card);
            });
        });
    });
};

displayFunction();


onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;

      document.getElementById("loginNav").style.display = "none";
      
      // ...
    } else {
      // User is signed out
      // ...

      document.getElementById("logoutNav").style.display = "none";
      document.getElementById("dashboard").style.display = "none";
      document.getElementById("profile").style.display = "none";


    }
  });


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



const currentTime = new Date();
const currentHour = currentTime.getHours();

let greeting;

if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning!";
} else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon!";
} else {
    greeting = "Good evening!";
}

console.log(greeting);

document.getElementById("greeting").innerHTML = greeting;
