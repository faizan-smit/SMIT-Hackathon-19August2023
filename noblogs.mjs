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


const displayFunction = () => {
    const q = query(collection(db, "Blogs"), orderBy("timestamp", "desc"));
    const showDiv = document.getElementById("blog");
    showDiv.innerHTML = "";

    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
            const Blogs = document.getElementById("blog");
            const card = document.createElement("div");
            const upperPart = document.createElement("div");
            const lowerPart = document.createElement("div");
            const link = document.createElement("a");
            const upperLeft = document.createElement("div");
            const upperRight = document.createElement("div");
            const image = document.createElement("img");
            const title = document.createElement("div");
            const author = document.createElement("div");
            const authorName = document.createElement("span");
            const postTime = document.createElement("span");
            link.innerHTML = "See All Blogs From This User";
            link.setAttribute('user', snapshot.data().userEmail);
            link.href = "#";

            link.addEventListener("click", onlyUserPosts.bind(null, snapshot.data().userEmail)); // Pass userEmail as argument

            image.src = './users-vector-icon-png_260862.jpg';
            image.setAttribute('width', '50');
            image.setAttribute('height', '50');
            upperLeft.appendChild(image);

            title.innerHTML = snapshot.data().postTitle;
            postTime.innerHTML = snapshot.data().timestamp;

            // Build the structure
            author.appendChild(authorName);
            author.appendChild(postTime);
            upperRight.appendChild(title);
            upperRight.appendChild(author);
            upperPart.appendChild(upperLeft);
            upperLeft.appendChild(upperRight);
            lowerPart.innerHTML = snapshot.data().postContent;
            card.appendChild(upperPart);
            card.appendChild(lowerPart);
            card.appendChild(link);
            Blogs.appendChild(card);
        });
    });
};

const onlyUserPosts = (userEmail) => {
    const q = query(collection(db, "Blogs"), orderBy("timestamp", "desc"));
    const showDiv = document.getElementById("blog");
    showDiv.innerHTML = "";

    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
            if (snapshot.data().userEmail === userEmail) {
                const Blogs = document.getElementById("blog");
            const card = document.createElement("div");
            const upperPart = document.createElement("div");
            const lowerPart = document.createElement("div");
            const link = document.createElement("a");
            const upperLeft = document.createElement("div");
            const upperRight = document.createElement("div");
            const image = document.createElement("img");
            const title = document.createElement("div");
            const author = document.createElement("div");
            const authorName = document.createElement("span");
            const postTime = document.createElement("span");
            link.innerHTML = "See All Blogs From This User";
            link.setAttribute('user', snapshot.data().userEmail);
            link.href = "#";

            link.addEventListener("click", onlyUserPosts.bind(null, snapshot.data().userEmail)); // Pass userEmail as argument

            image.src = './users-vector-icon-png_260862.jpg';
            image.setAttribute('width', '50');
            image.setAttribute('height', '50');
            upperLeft.appendChild(image);

            title.innerHTML = snapshot.data().postTitle;
            postTime.innerHTML = snapshot.data().timestamp;

            // Build the structure
            author.appendChild(authorName);
            author.appendChild(postTime);
            upperRight.appendChild(title);
            upperRight.appendChild(author);
            upperPart.appendChild(upperLeft);
            upperLeft.appendChild(upperRight);
            lowerPart.innerHTML = snapshot.data().postContent;
            card.appendChild(upperPart);
            card.appendChild(lowerPart);
            card.appendChild(link);
            Blogs.appendChild(card);
            }
        });
    });
};

displayFunction();
