import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, doc, query, orderBy, where, updateDoc, deleteField, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyBZscEB8xbcOASVEIEQOVeWWgKjDtFJp9k",
    authDomain: "saylani-hackathon-faizan.firebaseapp.com",
    projectId: "saylani-hackathon-faizan",
    storageBucket: "saylani-hackathon-faizan.appspot.com",
    messagingSenderId: "934814103114",
    appId: "1:934814103114:web:c5c7e8b071236a42bc58b3",
    measurementId: "G-RVQQTH8ZFE"
  };
  
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  


const displayFunction = ()=>{


    const q = query(collection(db, "Blogs"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let showDiv = document.getElementById("blog");
          showDiv.innerHTML = "";

          querySnapshot.forEach ((snapshot) =>{

            let Blogs = document.getElementById("blog")

            let card = document.createElement("div");
            let upperPart = document.createElement("div");
            let lowerPart = document.createElement("div");
            let link = document.createElement("a");
            let upperLeft = document.createElement("div");
            let upperRight = document.createElement("div");
            let image = document.createElement("img");
            let title = document.createElement("div");
            let author = document.createElement("div");
            let authorName = document.createElement("span");
            let postTime = document.createElement("span");
            link.innerHTML = "See All Blogs From This User"
            link.href = "#";
            
            image.src = './users-vector-icon-png_260862.jpg';
            image.setAttribute('width', '200');
            image.setAttribute('height', '200');

            upperLeft.appendChild(image);

            title.innerHTML = snapshot.data().postTitle;




            //////////////////////////


            let userEmail = snapshot.data().userEmail;
            const q1 = query(collection(db, "Posts"), orderBy("timestamp", "desc"));
            const unsubscribe = onSnapshot(q1, (querySnapshot) => {

                querySnapshot.forEach ((snapshotNew) =>{

                    if(snapshotNew.data.userEmail === userEmail){

                        authorName.innerHTML = snapshotNew.data().firstname + ' ' + snapshotNew.data().lastname;


                    }




                });



            })


            /////////////////////////


            postTime.innerHTML = snapshot.data().timestamp;
            author.appendChild(authorName);
            author.appendChild(postTime);
            upperRight.appendChild(title);
            upperRight.appendChild(author);
            upperPart.appendChild(upperLeft);
            upperLeft.appendChild(upperRight);
            lowerPart.innerHTML = snapshot.data().postContent
            card.appendChild(upperPart);
            card.appendChild(lowerPart);
            card.appendChild(link);
            Blogs.appendChild(card);




          })
        
        
        
        })



}

displayFunction()