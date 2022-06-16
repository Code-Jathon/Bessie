// const {auth, signIn}= require("./firebaseconfig");


function login(e){
  e.preventDefault();
  const email= document.getElementById("email").value;
  const password= document.getElementById("password").value;

  
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log(userCredential.user);
    // ...
  })
  .catch((error) => {
    console.log(error);
  });

}