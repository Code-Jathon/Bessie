import { showMessages } from "../components/showMessages.js";

const formularioIngreso = {
  formulario: document.getElementById("inicioSesion"),
  email: document.querySelector("#user"),
  password: document.querySelector("#password"),
};

function valiadarIngreso(email, password) {
  // Datos Vacios
  if (email.length < 0 && password.length < 0) {
    return console.error("Ingrese un usuario y contraseña");
  }

  // Email no valido
  const emailregex = /^[^@_]{3,}\.[^@_]{3,}@amigo\.edu\.co$/i;
  if (!emailregex.test(email)) {
    return console.warn(
      "El email no tiene el formato correcto",
      "amigo.edu.co"
    );
  }

  // Contraseña corta
  if (password.length < 8) {
    return console.warn("La contraseña debe tener al menos 8 caracteres");
  }

  // Correo valido
  return true;
}

formularioIngreso.formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let [email, password] = [
    formularioIngreso.email.value,
    formularioIngreso.password.value,
  ];

  if (valiadarIngreso(email, password)) {
    console.info("Campos correctos");
  }

  // Auntenticar con Firebase
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.info("Usuario autenticado");
      showMessages("Bienvenido al Fondo Editorial "+ email);
      setTimeout(() => {
        window.location.href = "./menu.html";
      }, 4000)
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        console.error("Usuario no encontrado ;-;", "#f27474");
        showMessages("Usuario " + email + " no ha sido encontrado ", "error");
      }
      if (error.code === "auth/wrong-password") {
        console.warn("Contraseña equivocada ;-;", "#f27474");
        showMessages("La contraseña ingresada para " + email + " esta equivocada", "error");
      }
      if (error.code === "auth/invalid-email") {
        console.info("Correo inválido (❁´◡`❁)", "#fe7474");
        showMessages("El correo " + email + " no es valido", "error");
      }
    });
});
