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

const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      window.location.href = `./login.html`;
    } catch (error) {
      console.error("Error signing out user", error);
    }
  };
  
  
  document.getElementById('SignOut').addEventListener('click', signOutUser)


  //////////////////////////////////



  document.getElementById("post-form").addEventListener('submit', async (event)=>{

    event.preventDefault();

    const title = document.getElementById("post-title").value;
    const content = document.getElementById("main-post").value;

    try {
        const docRef = await addDoc(collection(db, "Blogs"), {

            postTitle: title,
            postContent: content,
            userEmail: auth.currentUser.email,
            timestamp: serverTimestamp(),
          
        });
        console.log("Document written with ID: ", docRef.id);
    }
    catch (error) {
        console.error("Error adding document: ", error);
    }


  });


  //////////////////////


  ////////////////////////////////////////////////////////////





  ////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\


  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
    //   location.href = './index.html';


    const theUser = user.email;
    console.log(theUser);
    
    const q = query(collection(db, "Blogs"), orderBy("timestamp", "desc"));
    // const showDiv = document.getElementById("blog");
    // showDiv.innerHTML = "";

    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
            if (snapshot.data().userEmail === theUser){


            const Blogs = document.getElementById("myblogs");
            const card = document.createElement("div");
            card.classList.add("theCard");
            const upperPart = document.createElement("div");
            upperPart.classList.add("upperPart");
            const lowerPart = document.createElement("div");
            lowerPart.classList.add("lowerPart");
            // const link = document.createElement("a");
            const upperLeft = document.createElement("div");
            upperLeft.classList.add("upperLeft")
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
            const buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("buttonsDiv");
            const editButton = document.createElement("button");
            editButton.classList.add("editButton");
            editButton.addEventListener("click", editFuction)
            editButton.innerHTML = "Edit";
            editButton.setAttribute("referer", snapshot.id)
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("deleteButton");
            deleteButton.innerHTML = "Delete";
            deleteButton.setAttribute("referer", snapshot.id)

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
                    if (snapshotNew.data().useremail == userEmail) {
                        authorName.innerHTML = snapshotNew.data().firstname + ' ' + snapshotNew.data().lastname;
                    }
                    console.log(snapshotNew.data().firstname);
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
                buttonsDiv.appendChild(editButton);
                buttonsDiv.appendChild(deleteButton);
                card.appendChild(buttonsDiv);
                // card.appendChild(link);
                Blogs.appendChild(card);

            });


            }
            
            });
        });

      // ...

      let editFuction = (event)=>{

        console.log(event.target.parentNode.parentNode.firstChild.childNodes[1].firstChild.innerHTML);
        let title = event.target.parentNode.parentNode.firstChild.childNodes[1].firstChild.innerHTML;
        console.log(event.target.parentNode.parentNode.childNodes[1].innerHTML);
        let content = event.target.parentNode.parentNode.childNodes[1].innerHTML;

        console.log(event.target.attributes.referer.value);

        event.target.parentNode.parentNode.innerHTML = `
        
        <input type="text" value="${title}">
        <input type="text" value="${content}">
        <input type="submit" value="Update" ref="${event.target.attributes.referer.value}" class="update">

        
        `;


      }

      document.querySelectorAll('.update').forEach((but)=>{
        
        but.addEventListener('click', (event)=>{

            theRef = event.target.attributes.ref.value;

        let title = event.target.firstChild.value;
        console.log(title);
        let content = event.target.nextSibling.value;
        console.log(content);

      })
      })

      ///////

    } else {
      // User is signed out
      // ...
      location.href = './login.html';
    }
  });
