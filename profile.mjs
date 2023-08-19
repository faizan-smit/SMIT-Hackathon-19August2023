// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

// Initialize Firebase app and auth
// ...

// Get the form and reset message elements
const resetForm = document.getElementById("changePassword");
const resetMessage = document.getElementById("reset-message");

resetForm.addEventListener("click", passwordResetFunction);

let passwordResetFunction = (event) => {
    event.target.parentNode.innerHTML = `
    
    <input type="email" required placeholder="email">
    <input type="password" required placeholder="New Password">
    <input type="password" required placeholder="Confirm Password">
    <button id="pwdReset" class="update">Reset</button>
    
    `
  
}

document.addEventListener('click',async (event) => {
    if (event.target.classList.contains('update')) {

        const inputFields = event.target.parentNode.childNodes
        const newPassword = inputFields[0].value
        const confirmPassword = inputFields[1].value
        if (newPassword === confirmPassword) {


            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, "currentPassword");
                const user = userCredential.user;
                await updatePassword(user, newPassword);
                resetMessage.textContent = "Password reset successfully.";
              } catch (error) {
                resetMessage.textContent = "An error occurred. Please try again.";
                console.error("Error resetting password:", error);
              }



        }

    }



})





  
